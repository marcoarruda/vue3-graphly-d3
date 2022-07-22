<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GraphlyD3 } from "@livereader/graphly-d3-vue";
import "@livereader/graphly-d3-vue/style.css";
import { ForceSimulation, Graph } from "@livereader/graphly-d3";

import Hexagon from "./shapes/hexagon";
import { Event } from "@livereader/graphly-d3";
import { getNodeIdFromNodeClickEvent } from "./helpers";
// import { nodes, links } from "./stubs";

import { io, Socket } from "socket.io-client";
import { IUser } from "./helpers/interfaces";
import { Simulation } from "d3-force";

const users = ref<IUser[]>([]);
const user = ref<IUser | null>(null);

const graphly = ref<ForceSimulation | null>();
// const socketioAddress = ref<string>(process.env.SOCKET_SERVER);

function setupSimulation(socket: Socket, graph: Graph) {
  if (!graphly.value) return;

  const simulation = graphly.value.simulation as unknown as ForceSimulation;

  simulation.selectedNodes = ["node1"];
  simulation.envGravity = 0

  simulation.templateStore.add("hexagon", Hexagon);

  simulation.on(Event.EnvironmentClick, (event: PointerEvent) => {
    const { id: user_id } = user.value!;
    socket.emit("deselect", user_id);
  });

  // simulation.on(Event.NodeDragStart, (event: { subject: { id: string } }) => {
  //   const node_id = event.subject.id;
  //   if (node_id) {
  //     socket.emit("select-node", {
  //       user_id: user.value!.id,
  //       node_id,
  //     });
  //   }
  // });

  // simulation.on(Event.NodeDragMove, (event: { subject: { id: string } }) => {
  //   const node_id = event.subject.id;
  //   console.log(node_id)
  //   if (node_id) {
  //     selectNodeById(simulation, node_id);
  //   }
  // });

  simulation.on(
    Event.NodeDragEnd,
    (event: { subject: { id: string; x: number; y: number } }) => {
      const { x, y, id: node_id } = event.subject;
      console.log(event);
      if (node_id) {
        console.log(node_id);
        socket.emit("push-node", { node_id, position: { x, y } });
      }
    }
  );

  simulation.on(Event.NodeClick, (event: PointerEvent) => {
    const node_id = getNodeIdFromNodeClickEvent(event);
    if (node_id) {
      socket.emit("select-node", {
        user_id: user.value!.id,
        node_id,
      });
      // selectNodeById(simulation, node_id);
    }
  });

  simulation.render(graph);
}

onMounted(() => {
  const socketioAddress = import.meta.env.VITE_SOCKET_SERVER;
  console.log(socketioAddress);
  const socket: Socket = io(socketioAddress);
  socket.on("connect", function () {
    console.log("connection established");
    socket.emit("state");
    socket.emit("getdata");

    socket.on("state", (data) => {
      setupSimulation(socket, data);
    });

    socket.on("update", (data) => {
      if (graphly.value) {
        const simulation = graphly.value
          .simulation as unknown as ForceSimulation;
        simulation.render(data);
      }
    });

    socket.on("users", (data) => {
      users.value = data;
    });

    socket.on("getdata", (data: IUser) => {
      user.value = data;
    });
  });
  socket.on("message", function (data) {
    console.log(data);
  });
});
</script>

<template>
  <div style="height: 80vh">
    <GraphlyD3 ref="graphly" :dark="true" />
  </div>
  <div>Users connected: {{ users.length }}</div>
  <p v-if="user">
    You are:
    <span :style="{ color: user.color }">{{ user.id.slice(0, 8) }}</span>
  </p>
</template>

<style scoped></style>
