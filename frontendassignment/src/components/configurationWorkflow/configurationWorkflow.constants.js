export const NODE_STYLES = {
  color: "black",
  overflowWrap: "break-word",
  width: "250px",
};

export const LOAD_MORE_STYLE = {
  color: "white",
  background: "#2d75c7",
  overflowWrap: "break-word",
  width: "250px",
};

export const SELECTED_BACKGROUND = "#ffcd25";

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

export const NODE_EDGE_CONFIG_MAP_FOR_LOAD_MORE = {
  environment: {
    id: "vertical-e0-",
    target: "horizontal-0-",
  },
  features: {
    id: "vertical-e1-",
    target: "horizontal-1-",
    category: "envrionment",
  },
  subfeatures: {
    id: "vertical-e2-",
    target: "horizontal-2-",
    category: "features",
  },
  category: {
    id: "vertical-e3-",
    target: "horizontal-3-",
    category: "subfeatures",
  },
  configurations: {
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
  category: { id: "horizontal-4-", x: 1500, y: 150, category: "configuration" },
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
