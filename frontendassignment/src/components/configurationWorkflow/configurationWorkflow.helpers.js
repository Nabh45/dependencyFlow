// Constants
import {
  NODE_STYLES,
  NODE_EDGE_CONFIG_MAP,
  PREVIOUS_NODE_TO_NODE_MAP,
  NODE_CATEGORY_MAPPING,
  EDGE_CATEGORY_MAPPING,
} from "./configurationWorkflow.constants";

// Services
import {
  getFeaturesForEnv,
  getSubfeaturesForEnv,
  getConfigWithCategory,
} from "../../configurationService";

export const createNodes = (dependencyItems, previousNodeData) => {
  const nodeMapObject =
    PREVIOUS_NODE_TO_NODE_MAP[previousNodeData?.category] ||
    PREVIOUS_NODE_TO_NODE_MAP["default"];
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
  return nodes;
};

const updateSelectedIds = (currentSelectedIds, key, value) => {
  const currentValue = currentSelectedIds.current;
  currentSelectedIds.current = { ...currentValue, [key]: value };
};

export const getUpdatedNodesAndEdges = async (
  node,
  selectedIds,
  currentCategoryWithConfig
) => {
  const category = node.data.category;
  let currentSelectedIdKey;
  let nodes;
  let edges;

  switch (category) {
    case "environment":
      currentSelectedIdKey = "environmentId";
      const featureList = await getFeaturesForEnv(node.data.value._id);
      nodes = createNodes(featureList, node.data);
      edges = createEdges(node, featureList);
      break;

    case "features":
      currentSelectedIdKey = "featureId";
      const subfeatureList = await getSubfeaturesForEnv(
        node.data.value._id,
        selectedIds.current.environmentId
      );
      nodes = createNodes(subfeatureList, node.data);
      edges = createEdges(node, subfeatureList);
      break;

    case "subfeatures":
      currentSelectedIdKey = "subFeatureId";
      const categoryWithConfig = await getConfigWithCategory({
        featureId: selectedIds.current.featureId,
        subfeatureId: node.data.value._id,
        envId: selectedIds.current.environmentId,
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

  updateSelectedIds(selectedIds, currentSelectedIdKey, node.data.value._id);
  return { nodes: nodes, edges: edges };
};

const createEdges = (node, list) => {
  const config = NODE_EDGE_CONFIG_MAP[node.data.category];
  if (!config) return;
  let y = 0;
  const edges = list.map((item, index) => {
    y += 150;
    return {
      id: `${config.id}${index}`,
      source: node.id,
      type: "smoothstep",
      target: `${config.target}${index}`,
      category: config.category,
    };
  });
  return edges;
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
    EDGE_CATEGORY_MAPPING[node.data.category] || EDGE_CATEGORY_MAPPING.default;
  const updatedEdges = prevEdges.filter((item) =>
    categories.includes(item.category)
  );
  return updatedEdges;
};
