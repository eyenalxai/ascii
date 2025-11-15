import { useCallback, useMemo } from "react"
import { useHistory } from "@/hooks/use-history"
import {
	type Cell,
	cellsToGrid,
	createInitialCells,
	EMPTY_CHAR
} from "@/lib/grid-utils"

export const useGridState = () => {
	const {
		state: cells,
		setState: setCells,
		captureState,
		undo: undoHistory,
		redo: redoHistory,
		canUndo,
		canRedo
	} = useHistory<Cell[]>(createInitialCells())

	const grid = useMemo(() => cellsToGrid(cells), [cells])

	const isGridEmpty = useMemo(
		() => cells.every((cell) => cell.char === EMPTY_CHAR),
		[cells]
	)

	const updateCells = useCallback(
		(updater: (prevCells: Cell[]) => Cell[]) => {
			setCells(updater(cells))
		},
		[cells, setCells]
	)

	const captureHistory = useCallback(() => {
		captureState(cells)
	}, [cells, captureState])

	const clearCells = useCallback(() => {
		captureState(cells)
		setCells(createInitialCells())
	}, [cells, captureState, setCells])

	const undo = useCallback(() => {
		undoHistory()
	}, [undoHistory])

	const redo = useCallback(() => {
		redoHistory()
	}, [redoHistory])

	return {
		cells,
		grid,
		isGridEmpty,
		updateCells,
		clearCells,
		captureHistory,
		undo,
		redo,
		canUndo,
		canRedo
	}
}
