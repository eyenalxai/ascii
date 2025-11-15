import { useState } from "react"
import { isShapeMode } from "@/lib/drawing-helpers"
import type { Point } from "@/lib/drawing-types"
import type { Cell, DrawMode } from "@/lib/grid-utils"
import { moveCells, toggleCellInCells } from "@/lib/grid-utils"

type UseDrawingInteractionProps = {
	updateCells: (updater: (prevCells: Cell[]) => Cell[]) => void
	drawMode: DrawMode
	selectedChar: string
	brushSize: number
	startShape: (point: Point) => void
	updateShapeEnd: (point: Point) => void
	finishShape: () => void
	captureHistory: () => void
}

export const useDrawingInteraction = ({
	updateCells,
	drawMode,
	selectedChar,
	brushSize,
	startShape,
	updateShapeEnd,
	finishShape,
	captureHistory
}: UseDrawingInteractionProps) => {
	const [isDrawing, setIsDrawing] = useState(false)
	const [hoveredCell, setHoveredCell] = useState<Point | null>(null)
	const [moveStartPoint, setMoveStartPoint] = useState<Point | null>(null)
	const [originalCells, setOriginalCells] = useState<Cell[] | null>(null)

	const toggleCell = (row: number, col: number) => {
		updateCells((prev) =>
			toggleCellInCells(prev, row, col, selectedChar, drawMode, brushSize)
		)
	}

	const handleMouseDown = (row: number, col: number) => {
		captureHistory()
		setIsDrawing(true)
		if (isShapeMode(drawMode)) {
			startShape({ row, col })
		} else if (drawMode === "move") {
			setMoveStartPoint({ row, col })
			updateCells((prev) => {
				setOriginalCells(prev)
				return prev
			})
		} else {
			toggleCell(row, col)
		}
	}

	const handleMouseEnter = (row: number, col: number) => {
		if (!isDrawing) {
			if (drawMode !== "move") {
				setHoveredCell({ row, col })
			}
			return
		}

		if (isShapeMode(drawMode)) {
			updateShapeEnd({ row, col })
		} else if (drawMode === "move") {
			if (moveStartPoint && originalCells) {
				const deltaRow = row - moveStartPoint.row
				const deltaCol = col - moveStartPoint.col
				updateCells(() => moveCells(originalCells, deltaRow, deltaCol))
			}
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
		} else if (drawMode === "move") {
			setMoveStartPoint(null)
			setOriginalCells(null)
		}
		setIsDrawing(false)
	}

	const handleTouchStart = (e: React.TouchEvent, row: number, col: number) => {
		e.preventDefault()
		captureHistory()
		setIsDrawing(true)
		if (isShapeMode(drawMode)) {
			startShape({ row, col })
		} else if (drawMode === "move") {
			setMoveStartPoint({ row, col })
			updateCells((prev) => {
				setOriginalCells(prev)
				return prev
			})
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
				} else if (drawMode === "move") {
					if (moveStartPoint && originalCells) {
						const deltaRow = row - moveStartPoint.row
						const deltaCol = col - moveStartPoint.col
						updateCells(() => moveCells(originalCells, deltaRow, deltaCol))
					}
				} else {
					toggleCell(row, col)
				}
			}
		}
	}

	const handleTouchEnd = () => {
		if (isShapeMode(drawMode)) {
			finishShape()
		} else if (drawMode === "move") {
			setMoveStartPoint(null)
			setOriginalCells(null)
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
