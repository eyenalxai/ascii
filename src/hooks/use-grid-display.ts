import { useMemo } from "react"
import { isShapeMode } from "@/lib/drawing-helpers"
import type { Point } from "@/lib/drawing-types"
import type { Cell, DrawMode } from "@/lib/grid-utils"
import { createDisplayGrid, EMPTY_CHAR } from "@/lib/grid-utils"

type UseGridDisplayProps = {
	cells: Cell[]
	grid: Cell[][]
	hoveredCell: Point | null
	isDrawing: boolean
	shapePreviewPoints: Point[]
	drawMode: DrawMode
	selectedChar: string
	brushSize: number
}

export const useGridDisplay = ({
	cells,
	grid,
	hoveredCell,
	isDrawing,
	shapePreviewPoints,
	drawMode,
	selectedChar,
	brushSize
}: UseGridDisplayProps) => {
	const displayGrid = useMemo(() => {
		const hoverChar = drawMode === "erase" ? EMPTY_CHAR : selectedChar
		const shouldShowHover = Boolean(
			hoveredCell && !(isDrawing && isShapeMode(drawMode))
		)

		if (shapePreviewPoints.length > 0) {
			return createDisplayGrid(
				cells,
				shapePreviewPoints,
				selectedChar,
				brushSize,
				shouldShowHover ? hoveredCell : null,
				shouldShowHover ? hoverChar : null
			)
		}

		if (shouldShowHover) {
			return createDisplayGrid(
				cells,
				null,
				selectedChar,
				brushSize,
				hoveredCell,
				hoverChar
			)
		}

		return grid
	}, [
		grid,
		drawMode,
		shapePreviewPoints,
		selectedChar,
		cells,
		brushSize,
		isDrawing,
		hoveredCell
	])

	return displayGrid
}
