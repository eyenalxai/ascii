import { useMemo, useState } from "react"
import { type Cell, cellsToGrid, createInitialCells } from "@/lib/grid-utils"

export const useGridState = () => {
	const [cells, setCells] = useState<Cell[]>(createInitialCells())

	const grid = useMemo(() => cellsToGrid(cells), [cells])

	const updateCells = (updater: (prevCells: Cell[]) => Cell[]) => {
		setCells(updater)
	}

	const clearCells = () => {
		setCells(createInitialCells())
	}

	return {
		cells,
		grid,
		updateCells,
		clearCells
	}
}
