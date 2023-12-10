// Constants
import {
  NODE_STYLES,
  NODE_EDGE_CONFIG_MAP,
  PREVIOUS_NODE_TO_NODE_MAP,
  NODE_CATEGORY_MAPPING,
  EDGE_CATEGORY_MAPPING,
  NODE_EDGE_CONFIG_MAP_FOR_LOAD_MORE,
  LOAD_MORE_STYLE,
} from "./configurationWorkflow.constants";

// Services
import {
  getFeaturesForEnv,
  getSubfeaturesForEnv,
  getConfigWithCategory,
} from "../../configurationService";

const getFetchMoreNode = ({
  lastIndex,
  y,
  index,
  x,
  id,
  category,
  previousNodeId,
}) => ({
  id: `${id}${index}`,
  sourcePosition: "right",
  targetPosition: "left",
  data: {
    label: "Load More",
    value: "",
    category: category || "environment",
    fetchMoreDataNode: true,
    lastIndex: lastIndex,
    idPrefix: id,
    previousNodeId,
  },
  position: { x: x, y: y + 150 },
  style: LOAD_MORE_STYLE,
});

const addNodesToExisting = (node, newNodes, hasMore, lastIndex) => {
  const { idPrefix, category } = node.data;
  let index = node.data.lastIndex - 1;
  let { x, y } = node.position;
  y -= 150;
  let updatedNodes = newNodes.map((item) => {
    index++;
    y += 150;
    return {
      id: `${idPrefix}${index}`,
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: item.name,
        value: item,
        category: category,
      },
      position: { x: x, y: y },
      style: NODE_STYLES,
    };
  });
  if (hasMore) {
    const loadMoreNode = getFetchMoreNode({
      lastIndex,
      y,
      index: lastIndex,
      x,
      id: idPrefix,
      category,
      previousNodeId: node.data.previousNodeId,
    });
    updatedNodes.push(loadMoreNode);
  }
  return updatedNodes;
};

export const createNodes = (
  dependencyItems,
  previousNodeData,
  hasMore,
  lastIndex,
  previousNodeId
) => {
  const nodeMapObject =
    PREVIOUS_NODE_TO_NODE_MAP[previousNodeData?.category || "default"];
  let y = 0;
  const nodes = dependencyItems.map((item, index) => {
    y += 150;
    return {
      id: `${nodeMapObject.id}${index}`,
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: item.name,
        value: item,
        category: nodeMapObject.category || "environment",
      },
      position: { x: nodeMapObject.x, y: y },
      style: NODE_STYLES,
    };
  });
  if (hasMore) {
    const { id, x, category } = nodeMapObject;
    const loadMoreNode = getFetchMoreNode({
      lastIndex,
      y,
      index: nodes.length,
      x,
      id,
      category,
      previousNodeId,
    });
    nodes.push(loadMoreNode);
  }
  return nodes;
};

const createEdges = (node, list, hasMore) => {
  const config = hasMore
    ? NODE_EDGE_CONFIG_MAP_FOR_LOAD_MORE[node.data.category]
    : NODE_EDGE_CONFIG_MAP[node.data.category];
  if (!config) return;
  let y = hasMore ? node.position.y : 0;
  let index = hasMore ? node.data.lastIndex + 1 : 0;
  const edges = list.map((item) => {
    y += 150;
    const obj = {
      id: `${config.id}${index}`,
      source: hasMore ? node.data.previousNodeId : node.id,
      type: "smoothstep",
      target: `${config.target}${index}`,
      category: config.category,
    };
    index++;
    return obj;
  });
  return edges;
};

const updateSelectedIds = (selectedNodeDetails, key, value) => {
  const currentValue = selectedNodeDetails.current.selectedIds;
  selectedNodeDetails.current.selectedIds = { ...currentValue, [key]: value };
};

const getNextNodesAndEdges = async (
  node,
  selectedNodeDetails,
  currentCategoryWithConfig
) => {
  const category = node.data.category;
  const selectedIds = selectedNodeDetails.current.selectedIds;
  let currentSelectedIdKey;
  let nodes;
  let edges;
  switch (category) {
    case "environment": {
      currentSelectedIdKey = "environmentId";
      const { data, hasMore, lastIndex } = await getFeaturesForEnv(
        node.data.value._id
      );
      nodes = createNodes(data, node.data, hasMore, lastIndex, node.id);
      edges = createEdges(node, data);
      break;
    }
    case "features":
      currentSelectedIdKey = "featureId";
      const { data, hasMore, lastIndex } = await getSubfeaturesForEnv(
        node.data.value._id,
        selectedIds.environmentId
      );
      nodes = createNodes(data, node.data, hasMore, lastIndex, node.id);
      edges = createEdges(node, nodes);
      break;

    case "subfeatures":
      currentSelectedIdKey = "subFeatureId";
      const categoryWithConfig = await getConfigWithCategory({
        featureId: selectedIds.featureId,
        subfeatureId: node.data.value._id,
        envId: selectedIds.environmentId,
      });
      currentCategoryWithConfig.current = categoryWithConfig;
      nodes = createNodes(categoryWithConfig?.categoryInfo, node.data);
      edges = createEdges(node, categoryWithConfig?.categoryInfo);
      break;

    default:
      const { uniqueNamesAndProperties } = currentCategoryWithConfig.current;
      nodes = createNodes(uniqueNamesAndProperties, node.data);
      edges = createEdges(node, uniqueNamesAndProperties);
      break;
  }
  updateSelectedIds(
    selectedNodeDetails,
    currentSelectedIdKey,
    node.data.value._id
  );
  return { nodes, edges };
};

const createLoadMoreNodes = async (node, selectedIds) => {
  const category = node.data.category;
  switch (category) {
    case "subfeatures": {
      const { data, hasMore, lastIndex } = await getSubfeaturesForEnv(
        selectedIds.featureId,
        selectedIds.environmentId,
        5,
        node.data.lastIndex
      );
      const nodes = addNodesToExisting(node, data, hasMore, lastIndex);
      const edges = createEdges(node, nodes, true);
      return { nodes, edges };
    }
  }
};

export const getUpdatedNodesAndEdges = async (
  node,
  selectedNodeDetails,
  currentCategoryWithConfig
) => {
  const hasMoreNodeClicked = node.data.fetchMoreDataNode;
  const selectedIds = selectedNodeDetails.current.selectedIds;

  if (!hasMoreNodeClicked) {
    return getNextNodesAndEdges(
      node,
      selectedNodeDetails,
      currentCategoryWithConfig
    );
  } else {
    return createLoadMoreNodes(node, selectedIds);
  }
};

export const getUpdatedPrevNodes = (prevNodes, node) => {
  const categories =
    NODE_CATEGORY_MAPPING[node.data.category] || NODE_CATEGORY_MAPPING.default;
  const updatedNodes = prevNodes.filter((item) =>
    categories.includes(item.data.category)
  );
  return updatedNodes;
};

export const getUpdatedPrevEdges = (prevEdges, node) => {
  const categories =
    EDGE_CATEGORY_MAPPING?.[node.data.category] ||
    EDGE_CATEGORY_MAPPING.default;
  const updatedEdges = prevEdges.filter((item) =>
    categories.includes(item.category)
  );
  return updatedEdges;
};

const removeHighlightedNodes = (selectedNodeData) =>
  selectedNodeData.forEach(
    (item) =>
      (document.querySelector(`[data-id=${item.id}]`).style.background =
        "white")
  );

export const updateSelectedNodeDetails = (node = {}, selectedNodeDetails) => {
  const { category } = node?.data;
  const categories = EDGE_CATEGORY_MAPPING?.[node.data.category] || [
    "environment",
    "features",
    "subfeatures",
    "category",
  ];
  const selectedNodeData = selectedNodeDetails.current.selectedNodeData;
  removeHighlightedNodes(selectedNodeData);
  const updatedData = selectedNodeData.filter((item) =>
    categories.includes(item.data.category)
  );
  selectedNodeDetails.current.selectedNodeData = [...updatedData, node];
};

export const hightlightSelectedNodes = (selectedNodeDetails) => {
  const selectedNodeData = selectedNodeDetails.current.selectedNodeData;
  selectedNodeData.forEach(
    (item) =>
      (document.querySelector(`[data-id=${item.id}]`).style.background =
        "#ffb3b3")
  );
};
