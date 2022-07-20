import { ForceSimulation, Node } from "@livereader/graphly-d3";

export const updateNodesPayload = (
  nodes: Node[],
  simulation: ForceSimulation
) => {
  nodes.forEach(
    (node) =>
      (node.payload.selected = simulation.selectedNodes.includes(node.id))
  );
};

export const selectNodeById = (
  simulation: ForceSimulation,
  node_id: string
): boolean => {
  const {
    graph,
    graph: { nodes },
  } = simulation;
  const node = nodes.find((node) => node.id === node_id);
  if (node) {
    simulation.selectedNodes = [node_id];
    updateNodesPayload(nodes, simulation);
    simulation.render(graph);
    return true;
  }
  return false;
};
