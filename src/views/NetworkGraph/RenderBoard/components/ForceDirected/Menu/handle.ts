import { toParseNormal } from '@/utils';
import type { Ref } from 'vue';
import type { IState } from '@/views/NetworkGraph/context.vue';
import * as d3 from 'd3';

// 选择与之相连的节点
export function handleChooseConnectedNodesAndLinks(rightClickNode: any, state: Ref<IState>) {
  // 深度查询
  const searchNodes: any[] = [rightClickNode];
  const searchLinks: any[] = [];
  const finishNodes: any[] = [];

  const renderLinks = state.value.renderData.links;

  while (searchNodes.length > 0) {
    searchNodes.forEach(item => {
      search(item);
    });
  }

  function search(node: any) {
    renderLinks.forEach(item => {
      const [sourceID, targetID] = item.id.split('->');
      if (sourceID === node.id || targetID === node.id) {
        if (!searchLinks.map(item => item.id).includes(item.id)) {
          searchLinks.push(item);
        }

        if (![...searchNodes, ...finishNodes].map(item => item.id).includes(item.source.id)) {
          searchNodes.push(item.source);
        }

        if (![...searchNodes, ...finishNodes].map(item => item.id).includes(item.target.id)) {
          searchNodes.push(item.target);
        }
      }
    });

    finishNodes.push(searchNodes.shift());
  }

  console.log('searchLinks', searchLinks);
  console.log('finishNodes', finishNodes);

  state.value.target = { nodes: toParseNormal(finishNodes), links: toParseNormal(searchLinks) };
}

export function handleChooseGroupNodes(rightClickNode: any, state: Ref<IState>, R: Ref<number>) {
  // 解除引用，不会操作到原数组
  const renderData = toParseNormal(state.value.renderData);

  // 操作队列
  let queue: any[] = [];
  // 与点击节点相连的节点，并附带neighbors
  const connectedNodes: any[] = [];
  queue.push(rightClickNode);
  //找到与当前节点相连的所有节点，并添加邻居节点
  addNeighbors();
  // 为每个节点的相邻节点添加隶属度
  addR();

  // 以选中节点为起点构造树形结构
  const resTreeStructure = treeStructure();

  const resData: { nodes: any[]; links: any[] } = {
    nodes: [],
    links: [],
  };

  doSearch(resTreeStructure);

  if (R.value === 0) {
    resData.nodes = renderData.nodes;
  }

  state.value.target = resData;

  console.log('resTreeStructure', resTreeStructure);
  console.log(resData);

  function addNeighbors() {
    while (queue.length > 0) {
      //当前操作节点
      const currentNode = queue.shift();

      const neighbors: any[] = calcNeighbors(currentNode);
      currentNode.neighbors = neighbors;

      const operatedIDS = connectedNodes.map(item2 => item2.id);
      if (!operatedIDS.includes(currentNode.id)) {
        connectedNodes.push(currentNode);
      }

      const notOpNe = neighbors.filter(item => !operatedIDS.includes(item.id));
      queue = toParseNormal([...queue, ...notOpNe]);
    }

    //计算某个节点的邻居节点的
    function calcNeighbors(currentNode: any) {
      //相邻边
      const neighborLinks = renderData.links.filter(
        (item: any) => item.source.id === currentNode.id || item.target.id === currentNode.id,
      );

      // 相邻节点
      const neighborNodes = neighborLinks.map(item => {
        if (item.source.id === currentNode.id) {
          return item.target;
        } else {
          return item.source;
        }
      });

      return neighborNodes;
    }
  }

  function addR() {
    console.log('connectedNodes', connectedNodes);
    connectedNodes.forEach(item1 => {
      item1.neighbors.forEach((item2: any) => {
        const curr = connectedNodes.filter(item => item.id === item2.id)[0];

        const IDS1 = item1.neighbors.map((item: any) => item.id);
        const IDS2 = curr.neighbors.map((item: any) => item.id);
        const commonIDS = IDS1.filter((id: string) => IDS2.includes(id));

        const commonNodesNum = commonIDS.length;
        const minNodesNum = Math.min(item1.neighbors.length, curr.neighbors.length);

        item2.strR = `${commonNodesNum}/${minNodesNum}`;
        item2.R = Number((commonNodesNum / minNodesNum).toFixed(1));
      });
    });
  }

  function treeStructure() {
    const startNode = toParseNormal(connectedNodes[0]);

    startNode.neighbors.forEach((item: any) => {
      setTree(item);
    });

    function setTree(node: any) {
      if (!node.neighbors) {
        node.neighbors = connectedNodes.filter(item => item.id === node.id)[0].neighbors;
        node.neighbors.forEach((item: any) => {
          setTree(item);
        });
      } else {
        return;
      }
    }

    return startNode;
  }

  function doSearch(startNode: any) {
    resData.nodes.push(startNode);

    startNode.neighbors.forEach(item => {
      depSearch(item);
    });

    const resNodeIDS = resData.nodes.map(item => item.id);

    resData.links = renderData.links.filter(
      (item: any) => resNodeIDS.includes(item.source.id) && resNodeIDS.includes(item.target.id),
    );

    function depSearch(node: any) {
      const resNodeIDS = toParseNormal(resData.nodes.map((item: any) => item.id));
      if (resNodeIDS.includes(node.id)) {
        return;
      }
      if (node.R >= R.value) {
        resData.nodes.push(node);
        node.neighbors.forEach((item: any) => {
          depSearch(item);
        });
      } else {
        return;
      }
    }
  }
}
