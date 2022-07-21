<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GraphlyD3 } from "@livereader/graphly-d3-vue";
import "@livereader/graphly-d3-vue/style.css";
import { ForceSimulation, Node } from "@livereader/graphly-d3";

import Hexagon from "./shapes/hexagon";
import { Event } from "@livereader/graphly-d3";
import {
  getNodeIdFromNodeClickEvent,
  selectNodeById,
  updateNodesPayload,
} from "./helpers";
import { nodes, links } from "./stubs";

import { io } from "socket.io-client";

const graphly = ref<ForceSimulation | null>();
// const socketioAddress = ref<string>(process.env.SOCKET_SERVER);

onMounted(() => {
  if (!graphly.value) return;

  const socketioAddress = import.meta.env.VITE_SOCKET_SERVER;
  console.log(socketioAddress);
  const socket = io(socketioAddress);
  socket.on("message", function (data) {
    console.log(data);
  });
  function sendMsg() {
    socket.emit("message", "HELLO WORLD");
  }

  const simulation = graphly.value.simulation as unknown as ForceSimulation;

  simulation.selectedNodes = ["node1"];

  simulation.templateStore.add("hexagon", Hexagon);

  simulation.on(Event.EnvironmentClick, (event: PointerEvent) => {
    simulation.selectedNodes = [];
    updateNodesPayload(nodes, simulation);
    simulation.render(graph);
  });

  simulation.on(Event.NodeDragStart, (event: { subject: { id: string } }) => {
    const node_id = event.subject.id;
    if (node_id) {
      selectNodeById(simulation, node_id);
    }
  });

  simulation.on(Event.NodeClick, (event: PointerEvent) => {
    const node_id = getNodeIdFromNodeClickEvent(event);
    if (node_id) {
      selectNodeById(simulation, node_id);
    }
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
