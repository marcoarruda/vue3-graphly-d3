<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GraphlyD3 } from "@livereader/graphly-d3-vue";
import "@livereader/graphly-d3-vue/style.css";
import { ForceSimulation } from "@livereader/graphly-d3";

const graphly = ref<ForceSimulation>();

onMounted(() => {
  const simulation = graphly.value!.simulation;
  simulation.render({
    nodes: [
      {
        id: "node1",
        shape: {
          type: "hexagon",
          scale: 1,
        },
        x: -150,
        y: 30,
        anchor: {
          type: "soft",
          x: -150,
          y: 30,
        },
        payload: {
          title: "Hello\nWorld",
          color: "teal",
        },
      },
      {
        id: "node2",
        shape: {
          type: "hexagon",
          scale: 1,
        },
        x: 150,
        y: -30,
      },
    ],
    links: [
      {
        source: "node1",
        target: "node2",
        type: "solid",
        directed: true,
        label: "",
        strength: "weak",
      },
    ],
  });
});
</script>

<template>
  <div style="height: 90vh;">
    <GraphlyD3 ref="graphly" :dark="true" />
  </div>
</template>

<style scoped></style>
