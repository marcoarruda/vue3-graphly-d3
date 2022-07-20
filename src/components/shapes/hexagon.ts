import { TemplateAPI, Node } from "@livereader/graphly-d3";

const shapeBuilder = (data: any, templateApi: typeof TemplateAPI) => {
  const { ShapeStyle, TextCollection, CollectionStyle, Shape } = templateApi;

  const shape = Shape.Polygon(6, 300, 20);

  shape.style("fill", data.payload?.color ?? "blue");

  if (data.payload.selected) {
    shape.style("stroke", "white");
    shape.style("stroke-width", "10px");
    shape.style("stroke-dasharray", "30,30");
  }

  const titleShape = TextCollection(
    data.payload?.title ?? "",
    CollectionStyle(300, 400, 30, 320, 10, 10, 1, TemplateAPI.Alignment.Center),
    [ShapeStyle("class", "gly_text.dark"), ShapeStyle("font-size", "5em")]
  );
  shape.append(() => titleShape.node());

  return shape;
};

export default {
  shapeSize: 50,
  shapeBuilder,
};
