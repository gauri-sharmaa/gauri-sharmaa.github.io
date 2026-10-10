import type { CSSProperties } from "react";

// Graph paper, like a page from a notebook. Used behind the interest map.
export const GRID_PAPER: CSSProperties = {
  backgroundImage:
    "linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};
