<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GraphlyD3 } from "@livereader/graphly-d3-vue";
import "@livereader/graphly-d3-vue/style.css";
import { ForceSimulation, Node } from "@livereader/graphly-d3";

import Hexagon from "./shapes/hexagon";
import { Event } from "@livereader/graphly-d3";
import { getNodeIdFromNodeClickEvent } from "./helpers/events.helpers";
import { nodes, links } from "./stubs";

const graphly = ref<ForceSimulation | null>();

onMounted(() => {
  if (!graphly.value) return;

  const simulation = graphly.value.simulation as unknown as ForceSimulation;

  simulation.selectedNodes = ["node1"];

  simulation.templateStore.add("hexagon", Hexagon);

  simulation.on(Event.NodeClick, (event: PointerEvent) => {
    const node_id = getNodeIdFromNodeClickEvent(event);
    // const node = nodes.find((node) => node.id === node_id) as Node;
    // node.payload['selected'] = true;
    if (node_id)
      simulation.selectedNodes = [node_id]
  });

  const graph = {
    nodes,
    links,
  };

  simulation.render(graph);
});
</script>

<template>
  <div style="height: 90vh">
    <GraphlyD3 ref="graphly" :dark="true" />
  </div>
</template>

<style scoped></style>
