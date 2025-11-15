import type { Point, ShapeMode } from "@/lib/drawing-types"
import type { DrawMode } from "@/lib/grid-utils"
import { GRID_HEIGHT, GRID_WIDTH } from "@/lib/grid-utils"

export const isShapeMode = (mode: DrawMode): mode is ShapeMode => {
	return mode === "ellipse" || mode === "square"
}

export const clampToGrid = (point: Point): Point => {
	return {
		row: Math.max(0, Math.min(GRID_HEIGHT - 1, point.row)),
		col: Math.max(0, Math.min(GRID_WIDTH - 1, point.col))
	}
}
