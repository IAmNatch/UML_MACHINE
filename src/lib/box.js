import Konva from "konva";

export const BoxNode = ({ title, content }) => {
  const MAX_WIDTH = 150;
  const TEXT_MARGIN_BOTTOM = 10;
  const HORIZONTAL_PADDING = 20;
  const VERTICAL_PADDING = 10;

  // Create Text Nodes
  const titleNode = new Konva.Text({
    text: title,
    align: "center",
    fontStyle: "bold"
  });
  const contentNode = new Konva.Text({ text: content });

  // Decide whether to use widest width or maxWidth
  const widestText = Math.max(
    contentNode.getClientRect().width,
    titleNode.getClientRect().width
  );
  const elementWidth = widestText > MAX_WIDTH ? MAX_WIDTH : widestText;

  // Set all text to widest width
  titleNode.width(elementWidth);
  contentNode.width(elementWidth);
  // Move content down to be lower than title
  contentNode.y(titleNode.getClientRect().height + TEXT_MARGIN_BOTTOM);

  // Wrap all text in a group
  const textWrapper = new Konva.Group({});
  textWrapper.add(titleNode);
  textWrapper.add(contentNode);

  // Calculate rect of all text combined
  const textWrapperRect = textWrapper.getClientRect();

  // Create wrapper
  const rect = new Konva.Rect({
    x: textWrapperRect.x,
    y: textWrapperRect.y,
    width: textWrapperRect.width + HORIZONTAL_PADDING * 2,
    height: textWrapperRect.height + VERTICAL_PADDING * 2,
    fill: "grey",
    stroke: "black"
  });

  // Move text to sit inside of the rect instead of at 0,0
  textWrapper.x(textWrapperRect.x + HORIZONTAL_PADDING);
  textWrapper.y(textWrapperRect.y + VERTICAL_PADDING);

  // add textWrapper + rect to canvas
  const group = new Konva.Group({});
  group.add(rect);
  group.add(textWrapper);
  // group.add(titleNode);
  // group.add(contentNode);
  group.draggable(true);
  return group;
};
