import { TemplateAPI, Node } from "@livereader/graphly-d3";

const shapeBuilder = (data: Node) => {
  const {
    Alignment,
    ShapeStyle,
    TextCollection,
    CollectionStyle,
    Shape,
    TagShape,
    TagStyle,
    TagCollection,
  } = TemplateAPI;

  const shape = Shape.Polygon(6, 300, 20);

  shape.style("fill", data.payload?.selected?.color ?? "grey");

  if (data.payload.selected) {
    shape.style("stroke", data.payload.selected.color);
    shape.style("stroke-width", "10px");
    shape.style("stroke-dasharray", "30,30");

    const tags = TagCollection(
      [data.payload.selected.id.slice(0,10)],
      CollectionStyle(300, 1000, 30, 620, 10, 10, 2, Alignment.Left),
      TagStyle(0, [
        ShapeStyle("class", "gly_text.dark"),
        ShapeStyle("font-color", "red"),
        ShapeStyle("font-size", "5em"),
      ])
    );
    shape.append(() => tags.node());
  }

  return shape;
};

export default {
  shapeSize: 50,
  shapeBuilder,
};
