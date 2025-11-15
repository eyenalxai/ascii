import { useCallback, useEffect, useRef, useState } from "react"
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
	gridRows: number
	gridCols: number
}

export const useDrawingInteraction = ({
	updateCells,
	drawMode,
	selectedChar,
	brushSize,
	startShape,
	updateShapeEnd,
	finishShape,
	captureHistory,
	gridRows,
	gridCols
}: UseDrawingInteractionProps) => {
	const [isDrawing, setIsDrawing] = useState(false)
	const [hoveredCell, setHoveredCell] = useState<Point | null>(null)
	const [moveStartPoint, setMoveStartPoint] = useState<Point | null>(null)
	const [originalCells, setOriginalCells] = useState<Cell[] | null>(null)
	const gridRef = useRef<HTMLDivElement>(null)

	const getCellFromMousePosition = useCallback(
		(clientX: number, clientY: number): Point | null => {
			if (!gridRef.current) return null

			const gridRect = gridRef.current.getBoundingClientRect()
			const relativeX = clientX - gridRect.left
			const relativeY = clientY - gridRect.top

			const cellWidth = gridRect.width / gridCols
			const cellHeight = gridRect.height / gridRows

			let col = Math.floor(relativeX / cellWidth)
			let row = Math.floor(relativeY / cellHeight)

			col = Math.max(0, Math.min(gridCols - 1, col))
			row = Math.max(0, Math.min(gridRows - 1, row))

			return { row, col }
		},
		[gridRows, gridCols]
	)

	const toggleCell = useCallback(
		(row: number, col: number) => {
			updateCells((prev) =>
				toggleCellInCells(prev, row, col, selectedChar, drawMode, brushSize)
			)
		},
		[updateCells, selectedChar, drawMode, brushSize]
	)

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

	const handleMouseUp = useCallback(() => {
		if (isShapeMode(drawMode)) {
			finishShape()
		} else if (drawMode === "move") {
			setMoveStartPoint(null)
			setOriginalCells(null)
		}
		setIsDrawing(false)
	}, [drawMode, finishShape])

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
		const cell = getCellFromMousePosition(touch.clientX, touch.clientY)

		if (!cell) return

		if (isShapeMode(drawMode)) {
			updateShapeEnd(cell)
		} else if (drawMode === "move") {
			if (moveStartPoint && originalCells) {
				const deltaRow = cell.row - moveStartPoint.row
				const deltaCol = cell.col - moveStartPoint.col
				updateCells(() => moveCells(originalCells, deltaRow, deltaCol))
			}
		} else {
			toggleCell(cell.row, cell.col)
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

	useEffect(() => {
		if (!isDrawing) return

		const handleGlobalMouseMove = (e: MouseEvent) => {
			const cell = getCellFromMousePosition(e.clientX, e.clientY)
			if (!cell) return

			if (isShapeMode(drawMode)) {
				updateShapeEnd(cell)
			} else if (drawMode === "move") {
				if (moveStartPoint && originalCells) {
					const deltaRow = cell.row - moveStartPoint.row
					const deltaCol = cell.col - moveStartPoint.col
					updateCells(() => moveCells(originalCells, deltaRow, deltaCol))
				}
			} else {
				toggleCell(cell.row, cell.col)
			}
		}

		const handleGlobalMouseUp = () => {
			handleMouseUp()
		}

		window.addEventListener("mousemove", handleGlobalMouseMove)
		window.addEventListener("mouseup", handleGlobalMouseUp)

		return () => {
			window.removeEventListener("mousemove", handleGlobalMouseMove)
			window.removeEventListener("mouseup", handleGlobalMouseUp)
		}
	}, [
		isDrawing,
		drawMode,
		moveStartPoint,
		originalCells,
		updateShapeEnd,
		updateCells,
		toggleCell,
		handleMouseUp,
		getCellFromMousePosition
	])

	return {
		isDrawing,
		hoveredCell,
		handleMouseDown,
		handleMouseEnter,
		handleMouseLeave,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		gridRef
	}
}
