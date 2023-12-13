// Constants
import { HEADINGS } from "./configurationHeadings.constants";

export const getNodesCategory = (nodes) => {
  const nodeSet = new Set();
  nodes.forEach((node) => nodeSet.add(HEADINGS[node.data.category]));
  return Array.from(nodeSet);
};
