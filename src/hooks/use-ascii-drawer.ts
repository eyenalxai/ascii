import { ResultAsync } from "neverthrow"
import { toastManager } from "@/components/ui/toast"
import { useDrawingInteraction } from "@/hooks/use-drawing-interaction"
import { useDrawingTools } from "@/hooks/use-drawing-tools"
import { useGridDisplay } from "@/hooks/use-grid-display"
import { useGridState } from "@/hooks/use-grid-state"
import { useShapeDrawing } from "@/hooks/use-shape-drawing"
import { EMPTY_CHAR, gridToAscii } from "@/lib/grid-utils"

export const useAsciiDrawer = () => {
	const { cells, grid, updateCells, clearCells } = useGridState()

	const {
		drawMode,
		setDrawMode,
		selectedChar,
		setSelectedChar,
		brushSize,
		setBrushSize
	} = useDrawingTools()

	const { startShape, updateShapeEnd, finishShape, getShapePreviewPoints } =
		useShapeDrawing({
			updateCells,
			drawMode,
			char: selectedChar.char,
			brushSize
		})

	const {
		isDrawing,
		hoveredCell,
		handleMouseDown,
		handleMouseEnter,
		handleMouseLeave,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd
	} = useDrawingInteraction({
		updateCells,
		drawMode,
		selectedChar: selectedChar.char,
		brushSize,
		startShape,
		updateShapeEnd,
		finishShape
	})

	const displayGrid = useGridDisplay({
		cells,
		grid,
		hoveredCell,
		isDrawing,
		shapePreviewPoints: getShapePreviewPoints(),
		drawMode,
		selectedChar: selectedChar.char,
		brushSize
	})

	const clearGrid = () => {
		clearCells()
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

	return {
		grid: displayGrid,
		drawMode,
		setDrawMode,
		selectedChar,
		setSelectedChar,
		brushSize,
		setBrushSize,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		handleMouseLeave,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		clearGrid,
		exportAscii,
		emptyChar: EMPTY_CHAR
	}
}
