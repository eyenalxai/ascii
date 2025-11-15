import { ResultAsync } from "neverthrow"
import { useMemo, useState } from "react"
import { toastManager } from "@/components/ui/toast"
import { type AsciiChar, asciiCharacters } from "@/lib/ascii-characters"
import {
	applyShapeToCells,
	type Cell,
	cellsToGrid,
	clearCells,
	createDisplayGrid,
	createInitialCells,
	type DrawMode,
	EMPTY_CHAR,
	gridToAscii,
	toggleCellInCells
} from "@/lib/grid-utils"
import { getShapePoints } from "@/lib/shape-utils"

export const useAsciiDrawer = () => {
	const [cells, setCells] = useState<Cell[]>(createInitialCells())
	const [isDrawing, setIsDrawing] = useState(false)
	const [drawMode, setDrawMode] = useState<DrawMode>("draw")
	const [selectedChar, setSelectedChar] = useState<AsciiChar>(
		asciiCharacters[0]
	)
	const [shapeStart, setShapeStart] = useState<{
		row: number
		col: number
	} | null>(null)
	const [shapeEnd, setShapeEnd] = useState<{
		row: number
		col: number
	} | null>(null)

	const grid = useMemo(() => cellsToGrid(cells), [cells])

	const toggleCell = (row: number, col: number) => {
		setCells((prev) =>
			toggleCellInCells(prev, row, col, selectedChar.char, drawMode)
		)
	}

	const startShapeDrawing = (row: number, col: number) => {
		setIsDrawing(true)
		setShapeStart({ row, col })
		setShapeEnd({ row, col })
	}

	const startFreeDrawing = (row: number, col: number) => {
		setIsDrawing(true)
		toggleCell(row, col)
	}

	const finishShapeDrawing = () => {
		if (shapeStart && shapeEnd) {
			const points = getShapePoints(
				drawMode,
				shapeStart.row,
				shapeStart.col,
				shapeEnd.row,
				shapeEnd.col
			)
			if (points.length > 0) {
				setCells((prev) => applyShapeToCells(prev, points, selectedChar.char))
			}
			setShapeStart(null)
			setShapeEnd(null)
		}
		setIsDrawing(false)
	}

	const handleMouseDown = (row: number, col: number) => {
		if (drawMode === "ellipse" || drawMode === "square") {
			startShapeDrawing(row, col)
		} else {
			startFreeDrawing(row, col)
		}
	}

	const handleMouseEnter = (row: number, col: number) => {
		if (!isDrawing) return

		if ((drawMode === "ellipse" || drawMode === "square") && shapeStart) {
			setShapeEnd({ row, col })
		} else if (drawMode !== "ellipse" && drawMode !== "square") {
			toggleCell(row, col)
		}
	}

	const handleMouseUp = () => {
		finishShapeDrawing()
	}

	const handleTouchStart = (e: React.TouchEvent, row: number, col: number) => {
		e.preventDefault()
		if (drawMode === "ellipse" || drawMode === "square") {
			startShapeDrawing(row, col)
		} else {
			startFreeDrawing(row, col)
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

				if ((drawMode === "ellipse" || drawMode === "square") && shapeStart) {
					setShapeEnd({ row, col })
				} else if (drawMode !== "ellipse" && drawMode !== "square") {
					toggleCell(row, col)
				}
			}
		}
	}

	const handleTouchEnd = () => {
		finishShapeDrawing()
	}

	const clearGrid = () => {
		setCells((prev) => clearCells(prev))
	}

	const exportAscii = () => {
		const ascii = gridToAscii(grid)

		if (typeof navigator === "undefined" || navigator.clipboard === undefined) {
			toastManager.add({
				title: "Clipboard API is not available",
				description: "Clipboard API is not available",
				type: "error"
			})
			return
		}

		ResultAsync.fromPromise(navigator.clipboard.writeText(ascii), (error) => {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error"
			console.error(`Failed to copy to clipboard: ${errorMessage}`)
			toastManager.add({
				title: "Failed to copy to clipboard",
				description: "Failed to copy to clipboard",
				type: "error"
			})
		})
	}

	const displayGrid = useMemo(() => {
		if (shapeStart && shapeEnd) {
			const previewPoints = getShapePoints(
				drawMode,
				shapeStart.row,
				shapeStart.col,
				shapeEnd.row,
				shapeEnd.col
			)
			if (previewPoints.length > 0) {
				return createDisplayGrid(cells, previewPoints, selectedChar.char)
			}
		}
		return grid
	}, [grid, drawMode, shapeStart, shapeEnd, selectedChar, cells])

	return {
		grid: displayGrid,
		drawMode,
		setDrawMode,
		selectedChar,
		setSelectedChar,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		clearGrid,
		exportAscii,
		emptyChar: EMPTY_CHAR
	}
}
