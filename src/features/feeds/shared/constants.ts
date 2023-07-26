const IMAGE_GRID = {
  [1]: [{ rowSpan: 2, colSpan: 2 }],
  [2]: [
    { rowSpan: 2, colSpan: 1 },
    { rowSpan: 2, colSpan: 1 },
  ],
  [3]: [
    { rowSpan: 2, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
  ],
  [4]: [
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
    { rowSpan: 1, colSpan: 1 },
  ],
};

const DIALOG_CONTENT_HEIGHT = {
  media: 725,
  poll: 650,
};

export { DIALOG_CONTENT_HEIGHT, IMAGE_GRID };
