import type { Point } from "@/lib/drawing-types"
import { GRID_HEIGHT, GRID_WIDTH } from "@/lib/grid-utils"

export const getEllipsePointsFromBounds = (
	startRow: number,
	startCol: number,
	endRow: number,
	endCol: number
): Point[] => {
	const pointSet = new Set<string>()

	const minRow = Math.min(startRow, endRow)
	const maxRow = Math.max(startRow, endRow)
	const minCol = Math.min(startCol, endCol)
	const maxCol = Math.max(startCol, endCol)

	const width = maxCol - minCol
	const height = maxRow - minRow

	if (width <= 0 || height <= 0) {
		return []
	}

	const centerRow = (minRow + maxRow) / 2
	const centerCol = (minCol + maxCol) / 2
	const rx = width / 2
	const ry = height / 2

	const addPoint = (row: number, col: number) => {
		const clampedRow = Math.max(minRow, Math.min(maxRow, row))
		const clampedCol = Math.max(minCol, Math.min(maxCol, col))
		if (
			clampedRow >= 0 &&
			clampedRow < GRID_HEIGHT &&
			clampedCol >= 0 &&
			clampedCol < GRID_WIDTH
		) {
			const key = `${clampedRow},${clampedCol}`
			pointSet.add(key)
		}
	}

	for (let row = minRow; row <= maxRow; row++) {
		const dy = row - centerRow
		const dyOverRy = dy / ry
		const inside = 1 - dyOverRy * dyOverRy

		if (inside >= 0 && ry > 0) {
			const offset = rx * Math.sqrt(inside)
			const col1 = Math.round(centerCol - offset)
			const col2 = Math.round(centerCol + offset)

			addPoint(row, col1)
			addPoint(row, col2)
		} else if (ry === 0) {
			addPoint(row, minCol)
			addPoint(row, maxCol)
		}
	}

	for (let col = minCol; col <= maxCol; col++) {
		const dx = col - centerCol
		const dxOverRx = dx / rx
		const inside = 1 - dxOverRx * dxOverRx

		if (inside >= 0 && rx > 0) {
			const offset = ry * Math.sqrt(inside)
			const row1 = Math.round(centerRow - offset)
			const row2 = Math.round(centerRow + offset)

			addPoint(row1, col)
			addPoint(row2, col)
		} else if (rx === 0) {
			addPoint(minRow, col)
			addPoint(maxRow, col)
		}
	}

	return Array.from(pointSet).map((key) => {
		const [row, col] = key.split(",").map(Number)
		return { row, col }
	})
}
