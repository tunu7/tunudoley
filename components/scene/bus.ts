/** Shared state between page content and the 3D scene. Mutated from event handlers, read every frame. */
export const sceneBus = {
  /** Index of the highlighted card in the current section (0-2), or -1 for none. */
  focus: -1,
};

/** Local-space centres of the three stacked parts in the "Building" and "Work" shapes. */
export const PART_CENTERS: [number, number, number][] = [
  [0, 1.45, 0],
  [0, 0, 0],
  [0, -1.45, 0],
];

/** Scene index of each section, in page order. */
export const SCENES = ["hero", "about", "building", "work", "principles", "contact"] as const;
