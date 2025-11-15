import { getEllipsePointsFromBounds } from "@/lib/ellipse-utils"
import type { DrawMode } from "@/lib/grid-utils"
import { getSquarePoints } from "@/lib/square-utils"

export const getShapePoints = (
	drawMode: DrawMode,
	startRow: number,
	startCol: number,
	endRow: number,
	endCol: number
): Array<{ row: number; col: number }> => {
	if (drawMode === "ellipse") {
		return getEllipsePointsFromBounds(startRow, startCol, endRow, endCol)
	}
	if (drawMode === "square") {
		return getSquarePoints(startRow, startCol, endRow, endCol)
	}
	return []
}
