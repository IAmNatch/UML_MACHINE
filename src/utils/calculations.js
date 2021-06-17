import * as R from "ramda";

export const getMaxBounds = (LINE_SPACING) =>
  R.reduce(
    (acc, e) => {
      return {
        width: Math.round(R.max(acc.width, e.width)), // widest width
        height: acc.height + e.height, // cummulative height
        lineSpacing: acc.lineSpacing + LINE_SPACING // cummulative spacers
      };
    },
    {
      width: 0,
      height: 0,
      x: 0,
      lineSpacing: 0
    }
  );
