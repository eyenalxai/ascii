import type { Point, ShapeMode } from "@/lib/drawing-types"
import type { DrawMode } from "@/lib/grid-utils"
import { GRID_HEIGHT, GRID_WIDTH } from "@/lib/grid-utils"

export const isShapeMode = (mode: DrawMode): mode is ShapeMode => {
	return mode === "ellipse" || mode === "square"
}

export const expandPointsWithBrush = (
	points: Point[],
	brushSize: number
): Point[] => {
	const expandedPoints: Point[] = []
	const pointSet = new Set<string>()

	for (const point of points) {
		for (let r = point.row; r < point.row + brushSize && r < GRID_HEIGHT; r++) {
			for (
				let c = point.col;
				c < point.col + brushSize && c < GRID_WIDTH;
				c++
			) {
				const key = `${r},${c}`
				if (!pointSet.has(key)) {
					pointSet.add(key)
					expandedPoints.push({ row: r, col: c })
				}
			}
		}
	}

	return expandedPoints
}

export const clampToGrid = (point: Point): Point => {
	return {
		row: Math.max(0, Math.min(GRID_HEIGHT - 1, point.row)),
		col: Math.max(0, Math.min(GRID_WIDTH - 1, point.col))
	}
}

export const getBrushCells = (
	row: number,
	col: number,
	brushSize: number
): Point[] => {
	const cells: Point[] = []

	for (let r = row; r < row + brushSize && r < GRID_HEIGHT; r++) {
		for (let c = col; c < col + brushSize && c < GRID_WIDTH; c++) {
			cells.push({ row: r, col: c })
		}
	}

	return cells
}
