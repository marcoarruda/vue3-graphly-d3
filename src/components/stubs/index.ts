import {
  Node,
  Anchor,
  AnchorType,
  Link,
  LinkType,
  LinkStrength,
} from "@livereader/graphly-d3";

const node01 = {
  id: "node1",
  shape: {
    type: "hexagon",
    scale: 2,
  },
  x: -150,
  y: 20,
  anchor: {
    type: AnchorType.Soft,
    x: -150,
    y: 0,
  } as Anchor,
  payload: {
    title: "Hello World",
    color: "teal",
  },
};

const node02 = {
  id: "node2",
  shape: {
    type: "hexagon",
    scale: 2,
  },
  payload: {
    title: "node 02",
    color: "purple",
  },
};

export const nodes: Node[] = [node01, node02];

export const links: Link[] = [
  {
    source: "node1",
    target: "node2",
    type: LinkType.Dashed,
    directed: true,
    label: "link name",
    strength: LinkStrength.Strong,
  },
];
