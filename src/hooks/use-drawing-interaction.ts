import { useState } from "react"
import { isShapeMode } from "@/lib/drawing-helpers"
import type { Point } from "@/lib/drawing-types"
import type { Cell, DrawMode } from "@/lib/grid-utils"
import { toggleCellInCells } from "@/lib/grid-utils"

type UseDrawingInteractionProps = {
	updateCells: (updater: (prevCells: Cell[]) => Cell[]) => void
	drawMode: DrawMode
	selectedChar: string
	brushSize: number
	startShape: (point: Point) => void
	updateShapeEnd: (point: Point) => void
	finishShape: () => void
}

export const useDrawingInteraction = ({
	updateCells,
	drawMode,
	selectedChar,
	brushSize,
	startShape,
	updateShapeEnd,
	finishShape
}: UseDrawingInteractionProps) => {
	const [isDrawing, setIsDrawing] = useState(false)
	const [hoveredCell, setHoveredCell] = useState<Point | null>(null)

	const toggleCell = (row: number, col: number) => {
		updateCells((prev) =>
			toggleCellInCells(prev, row, col, selectedChar, drawMode, brushSize)
		)
	}

	const handleMouseDown = (row: number, col: number) => {
		setIsDrawing(true)
		if (isShapeMode(drawMode)) {
			startShape({ row, col })
		} else {
			toggleCell(row, col)
		}
	}

	const handleMouseEnter = (row: number, col: number) => {
		if (!isDrawing) {
			setHoveredCell({ row, col })
			return
		}

		if (isShapeMode(drawMode)) {
			updateShapeEnd({ row, col })
		} else {
			setHoveredCell({ row, col })
			toggleCell(row, col)
		}
	}

	const handleMouseLeave = () => {
		setHoveredCell(null)
	}

	const handleMouseUp = () => {
		if (isShapeMode(drawMode)) {
			finishShape()
		}
		setIsDrawing(false)
	}

	const handleTouchStart = (e: React.TouchEvent, row: number, col: number) => {
		e.preventDefault()
		setIsDrawing(true)
		if (isShapeMode(drawMode)) {
			startShape({ row, col })
		} else {
			toggleCell(row, col)
		}
	}

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDrawing) return

		e.preventDefault()

		const touch = e.touches[0]
		const element = document.elementFromPoint(touch.clientX, touch.clientY)

		if (element instanceof HTMLButtonElement) {
			const rowAttr = element.dataset.row
			const colAttr = element.dataset.col

			if (rowAttr !== undefined && colAttr !== undefined) {
				const row = Number.parseInt(rowAttr, 10)
				const col = Number.parseInt(colAttr, 10)

				if (isShapeMode(drawMode)) {
					updateShapeEnd({ row, col })
				} else {
					toggleCell(row, col)
				}
			}
		}
	}

	const handleTouchEnd = () => {
		if (isShapeMode(drawMode)) {
			finishShape()
		}
		setIsDrawing(false)
	}

	return {
		isDrawing,
		hoveredCell,
		handleMouseDown,
		handleMouseEnter,
		handleMouseLeave,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd
	}
}
