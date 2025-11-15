import { GRID_HEIGHT, GRID_WIDTH } from "@/lib/grid-utils"

export const getSquarePoints = (
	startRow: number,
	startCol: number,
	endRow: number,
	endCol: number
): Array<{ row: number; col: number }> => {
	const points: Array<{ row: number; col: number }> = []
	const minRow = Math.min(startRow, endRow)
	const maxRow = Math.max(startRow, endRow)
	const minCol = Math.min(startCol, endCol)
	const maxCol = Math.max(startCol, endCol)

	for (let row = minRow; row <= maxRow; row++) {
		for (let col = minCol; col <= maxCol; col++) {
			if (
				(row === minRow ||
					row === maxRow ||
					col === minCol ||
					col === maxCol) &&
				row < GRID_HEIGHT &&
				col < GRID_WIDTH
			) {
				points.push({ row, col })
			}
		}
	}
	return points
}
