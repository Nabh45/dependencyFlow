// Components
import EnvironmentNode from "./components/environment/EnvironmentNode";

export const NODE_TYPES = { environmentNode: EnvironmentNode };

export const NODE_STYLES = {
  background: "#2B6CB0",
  color: "white",
  overflowWrap: "break-word",
  width: "250px",
};

export const NODE_EDGE_CONFIG_MAP = {
  environment: {
    id: "vertical-e1-",
    target: "horizontal-1-",
    category: "environment",
  },
  features: {
    id: "vertical-e2-",
    target: "horizontal-2-",
    category: "features",
  },
  subfeatures: {
    id: "vertical-e3-",
    target: "horizontal-3-",
    category: "subfeatures",
  },
  category: {
    id: "vertical-e4-",
    target: "horizontal-4-",
    category: "category",
  },
};

export const PREVIOUS_NODE_TO_NODE_MAP = {
  default: {
    id: "horizontal-0-",
    x: 0,
    y: 150,
    category: "environment",
  },
  environment: { id: "horizontal-1-", x: 400, y: 150, category: "features" },
  features: { id: "horizontal-2-", x: 800, y: 150, category: "subfeatures" },
  subfeatures: { id: "horizontal-3-", x: 1200, y: 150, category: "category" },
  category: { id: "horizontal-4-", x: 1500, y: 150, category: "configiration" },
};

export const MINI_MAP_STYLE = {
  height: 120,
};

export const NODE_CATEGORY_MAPPING = {
  environment: ["environment"],
  features: ["environment", "features"],
  subfeatures: ["environment", "features", "subfeatures"],
  default: ["environment", "features", "subfeatures", "category"],
};

export const EDGE_CATEGORY_MAPPING = {
  environment: [],
  features: ["environment"],
  subfeatures: ["environment", "features"],
  default: ["environment", "features", "subfeatures"],
};
