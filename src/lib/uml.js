import Konva from "konva";
import * as R from "ramda";
import { debug } from "../utils/debug";
import { getMaxBounds } from "../utils/calculations";

const INNER_OFFSET_X = 10;
const INNER_OFFSET_Y = 10;
const MAX_WIDTH = 250;
const LINE_SPACING = 15;
const GROUP_SPACING = 20; // space between groups

const generateTitle = ({ title }) => {
  const text = new Konva.Text({
    text: title,
    y: INNER_OFFSET_Y,
    align: "center",
    fontStyle: "bold",
    lineHeight: 1.6
  });
  const rect = new Konva.Rect({
    fill: "#728280",
    x: 0,
    y: 0,
    width: INNER_OFFSET_X,
    height: text.height() + INNER_OFFSET_Y,
    stroke: "black"
  });
  const group = new Konva.Group({});
  group.add(rect);
  group.add(text);
  return group;
};

const generateContentGroups = ({ content, titleGroup }) => {
  // this group wraps everything
  const contentGroup = new Konva.Group({
    x: INNER_OFFSET_X
  });

  // Generate subgroups from text content
  const contentSubGroups = content.reduce(
    (acc, contentList, i) => {
      // At this point we don't care about positioning
      // That will be taken care of after width is set

      const group = new Konva.Group({});

      contentList.forEach((text, j) => {
        group.add(
          new Konva.Text({
            text: `- ${text}`,
            y: j * LINE_SPACING
          })
        );
      });

      const groupHeight = group.getClientRect().height;

      return {
        groups: [...acc.groups, group],
        height: acc.height + groupHeight
      };
    },
    { groups: [], height: 0 }
  );

  contentSubGroups.groups.forEach((group) => {
    contentGroup.add(group);
  });

  return contentGroup;
};

const generateMaxDimensions = ({ titleGroup, contentContainer }) => {
  const titleWidth = titleGroup.getClientRect();
  const containerDimensions = contentContainer.getClientRect();
  return getMaxBounds(LINE_SPACING)([titleWidth, containerDimensions]);
};

export const UMLNode = ({ title, content, pos: { x = 10, y = 10 } = {} }) => {
  const parentGroup = new Konva.Group({ x, y });

  const titleGroup = generateTitle({ title });
  const contentContainer = generateContentGroups({ content, titleGroup });

  const contentWidth = generateMaxDimensions({ titleGroup, contentContainer });

  const widthOfPanel =
    contentWidth.width > MAX_WIDTH ? MAX_WIDTH : contentWidth.width;

  titleGroup.children.forEach((c) =>
    c.width(widthOfPanel + INNER_OFFSET_X * 2)
  );

  titleGroup.children[0].height(
    titleGroup.getClientRect().height + INNER_OFFSET_Y
  );

  // const MOVE_DOWN_BY = acc.height + i * GROUP_SPACING;
  contentContainer.children.reduce(
    (acc, c, i) => {
      c.children?.forEach((t) => {
        t.width(widthOfPanel);
        t.zIndex(1);
      });

      // // ****
      const MOVE_DOWN_BY = acc.height + i * GROUP_SPACING;
      c.y(MOVE_DOWN_BY);
      // measure height beofre adding lines
      const groupWithoutExtras = c.getClientRect();
      const groupHeight = groupWithoutExtras.height;

      const rec = new Konva.Rect({
        stroke: "black",
        fill: `#96aba9`,
        width: groupWithoutExtras.width + 20,
        height: groupHeight + GROUP_SPACING,
        x: -10,
        y: -10
      });

      c.add(rec);

      rec.zIndex(0);

      return { height: acc.height + groupHeight };
    },
    { height: 0 }
  );

  contentContainer.y(INNER_OFFSET_Y + titleGroup.getClientRect().height);

  const contentHeight = generateMaxDimensions({ titleGroup, contentContainer });

  const rect = new Konva.Rect({
    width: widthOfPanel + INNER_OFFSET_X * 2,
    height: contentHeight.height - 2,
    fill: "white",
    stroke: "black",
    strokeWidth: 1
  });

  parentGroup.add(rect);
  parentGroup.add(titleGroup);
  parentGroup.add(contentContainer);

  parentGroup.draggable(true);
  return parentGroup;
};
