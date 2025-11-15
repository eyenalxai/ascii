import { useState } from "react"
import type { Point, ShapeState } from "@/lib/drawing-types"
import type { Cell, DrawMode } from "@/lib/grid-utils"
import { applyShapeToCells } from "@/lib/grid-utils"
import { getShapePoints } from "@/lib/shape-utils"

type UseShapeDrawingProps = {
	updateCells: (updater: (prevCells: Cell[]) => Cell[]) => void
	drawMode: DrawMode
	char: string
	brushSize: number
}

export const useShapeDrawing = ({
	updateCells,
	drawMode,
	char,
	brushSize
}: UseShapeDrawingProps) => {
	const [shapeState, setShapeState] = useState<ShapeState>({
		start: null,
		end: null
	})

	const startShape = (point: Point) => {
		setShapeState({
			start: point,
			end: point
		})
	}

	const updateShapeEnd = (point: Point) => {
		setShapeState((prev) => ({
			...prev,
			end: point
		}))
	}

	const finishShape = () => {
		if (shapeState.start && shapeState.end) {
			const points = getShapePoints(
				drawMode,
				shapeState.start.row,
				shapeState.start.col,
				shapeState.end.row,
				shapeState.end.col
			)
			if (points.length > 0) {
				updateCells((prev) => applyShapeToCells(prev, points, char, brushSize))
			}
		}
		clearShape()
	}

	const clearShape = () => {
		setShapeState({
			start: null,
			end: null
		})
	}

	const getShapePreviewPoints = (): Point[] => {
		if (!shapeState.start || !shapeState.end) {
			return []
		}

		return getShapePoints(
			drawMode,
			shapeState.start.row,
			shapeState.start.col,
			shapeState.end.row,
			shapeState.end.col
		)
	}

	return {
		shapeState,
		startShape,
		updateShapeEnd,
		finishShape,
		clearShape,
		getShapePreviewPoints
	}
}
