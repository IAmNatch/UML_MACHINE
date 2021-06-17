import Konva from "konva";
import * as R from "ramda";
import { debug } from "../utils/debug";
import { getMaxBounds } from "../utils/calculations";

const INNER_OFFSET_X = 10;
const INNER_OFFSET_Y = 10;
const MAX_WIDTH = 150;
const LINE_SPACING = 15;
const GROUP_SPACING = 30;

const generateTitle = ({ title }) => {
  const text = new Konva.Text({
    text: title,
    x: INNER_OFFSET_X,
    y: INNER_OFFSET_Y,
    align: "center",
    fontStyle: "bold"
  });

  return text;
};

const generateContentGroups = ({ content, titleEl }) => {
  const contentGroup = new Konva.Group({
    x: INNER_OFFSET_X,
    y: INNER_OFFSET_Y * 2 + titleEl.getClientRect().height
  });

  const contentGroups = content.reduce(
    (acc, contentList, i) => {
      console.log("acc", acc);
      const group = new Konva.Group({
        y: acc.height + i * GROUP_SPACING
      });

      contentList.forEach((text, j) => {
        group.add(
          new Konva.Text({
            text: text,
            y: j * LINE_SPACING
          })
        );
      });
      // measure height beofre adding lines
      const groupHeight = group.getClientRect().height;
      group.add(
        new Konva.Line({
          x: -INNER_OFFSET_X,
          y: acc.height + groupHeight,
          points: [0, 0, 50, 0],
          stroke: "red",
          tension: 1
        })
      );
      return {
        groups: [...acc.groups, group],
        height: acc.height + groupHeight
      };
    },
    { groups: [], height: 0 }
  );

  contentGroups.groups.forEach((group) => {
    contentGroup.add(group);
  });

  return contentGroup;
};

const generateMaxDimensions = ({ titleEl, contentContainer }) => {
  const titleWidth = titleEl.getClientRect();
  const containerDimensions = contentContainer.getClientRect();
  return getMaxBounds(LINE_SPACING)([titleWidth, containerDimensions]);
};

export const UMLNode = ({ title, content }) => {
  const parentGroup = new Konva.Group({ x: 10, y: 10 });

  const titleEl = generateTitle({ title });
  const contentContainer = generateContentGroups({ content, titleEl });

  parentGroup.add(contentContainer);
  parentGroup.add(titleEl);

  const contentWidth = generateMaxDimensions({ titleEl, contentContainer });

  const widthOfPanel =
    contentWidth.width > MAX_WIDTH ? MAX_WIDTH : contentWidth.width;

  titleEl.width(widthOfPanel - INNER_OFFSET_X);
  contentContainer.children.forEach((c) =>
    c.children?.forEach((t) => t.width(widthOfPanel))
  );

  const contentHeight = generateMaxDimensions({ titleEl, contentContainer });

  const rect = new Konva.Rect({
    width: widthOfPanel + INNER_OFFSET_X * 2,
    height: contentHeight.height + contentHeight.lineSpacing,
    fill: "transparent",
    stroke: "black",
    strokeWidth: 1
  });

  parentGroup.add(rect);
  // parentGroup.add(

  // );

  return parentGroup;
};
