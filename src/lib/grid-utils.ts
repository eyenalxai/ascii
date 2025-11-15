export const GRID_WIDTH = 32
export const GRID_HEIGHT = 16

export type Cell = {
	id: string
	char: string
	row: number
	col: number
}

export type DrawMode = "draw" | "erase" | "ellipse" | "square"

export const EMPTY_CHAR = "\u2007"

export const createInitialCells = (): Cell[] => {
	return Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, index) => ({
		id: `cell-${index}`,
		char: EMPTY_CHAR,
		row: Math.floor(index / GRID_WIDTH),
		col: index % GRID_WIDTH
	}))
}

export const cellsToGrid = (cells: Cell[]): Cell[][] => {
	const result: Cell[][] = Array.from({ length: GRID_HEIGHT }, () => [])
	for (const cell of cells) {
		result[cell.row].push(cell)
	}
	return result
}

export const toggleCellInCells = (
	cells: Cell[],
	row: number,
	col: number,
	char: string,
	drawMode: DrawMode
): Cell[] => {
	return cells.map((cell) =>
		cell.row === row && cell.col === col
			? {
					...cell,
					char: drawMode === "draw" ? char : EMPTY_CHAR
				}
			: cell
	)
}

export const applyShapeToCells = (
	cells: Cell[],
	points: Array<{ row: number; col: number }>,
	char: string
): Cell[] => {
	return cells.map((cell) => {
		const isInShape = points.some(
			(p) => p.row === cell.row && p.col === cell.col
		)
		if (isInShape) {
			return {
				...cell,
				char
			}
		}
		return cell
	})
}

export const clearCells = (cells: Cell[]): Cell[] => {
	return cells.map((cell) => ({ ...cell, char: EMPTY_CHAR }))
}

export const gridToAscii = (grid: Cell[][]): string => {
	return grid.map((row) => row.map((cell) => cell.char).join("")).join("\n")
}

export const createDisplayGrid = (
	cells: Cell[],
	previewPoints: Array<{ row: number; col: number }> | null,
	previewChar: string
): Cell[][] => {
	const result: Cell[][] = Array.from({ length: GRID_HEIGHT }, () => [])
	for (const cell of cells) {
		const isPreview = previewPoints?.some(
			(p) => p.row === cell.row && p.col === cell.col
		)
		result[cell.row].push({
			...cell,
			char: isPreview === true ? previewChar : cell.char
		})
	}
	return result
}
