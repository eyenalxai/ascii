export const GRID_WIDTH = 32
export const GRID_HEIGHT = 16

export type Cell = {
	id: string
	char: string
	row: number
	col: number
	isHoverPreview?: boolean
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
	drawMode: DrawMode,
	brushSize: number
): Cell[] => {
	const brushCells = getBrushCells(row, col, brushSize)

	return cells.map((cell) => {
		const isInBrush = brushCells.some(
			(bc) => bc.row === cell.row && bc.col === cell.col
		)
		return isInBrush
			? {
					...cell,
					char: drawMode === "draw" ? char : EMPTY_CHAR
				}
			: cell
	})
}

export const applyShapeToCells = (
	cells: Cell[],
	points: Array<{ row: number; col: number }>,
	char: string,
	brushSize: number
): Cell[] => {
	const expandedPoints: Array<{ row: number; col: number }> = []

	for (const point of points) {
		const brushCells = getBrushCells(point.row, point.col, brushSize)
		expandedPoints.push(...brushCells)
	}

	return cells.map((cell) => {
		const isInShape = expandedPoints.some(
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
	previewChar: string,
	brushSize: number,
	hoverCell: { row: number; col: number } | null = null,
	hoverChar: string | null = null
): Cell[][] => {
	const result: Cell[][] = Array.from({ length: GRID_HEIGHT }, () => [])

	const expandedPreviewPoints: Array<{ row: number; col: number }> = []
	if (previewPoints) {
		for (const point of previewPoints) {
			const brushCells = getBrushCells(point.row, point.col, brushSize)
			expandedPreviewPoints.push(...brushCells)
		}
	}

	const expandedHoverCells: Array<{ row: number; col: number }> = []
	if (hoverCell && hoverChar !== null) {
		const hoverBrushCells = getBrushCells(
			hoverCell.row,
			hoverCell.col,
			brushSize
		)
		expandedHoverCells.push(...hoverBrushCells)
	}

	for (const cell of cells) {
		const isPreview = expandedPreviewPoints.some(
			(p) => p.row === cell.row && p.col === cell.col
		)
		const isHover = expandedHoverCells.some(
			(p) => p.row === cell.row && p.col === cell.col
		)

		result[cell.row].push({
			...cell,
			char: isPreview
				? previewChar
				: isHover && hoverChar !== null
					? hoverChar
					: cell.char,
			isHoverPreview: isHover && !isPreview
		})
	}
	return result
}

export const getBrushCells = (
	row: number,
	col: number,
	brushSize: number
): Array<{ row: number; col: number }> => {
	const cells: Array<{ row: number; col: number }> = []

	for (let r = row; r < row + brushSize && r < GRID_HEIGHT; r++) {
		for (let c = col; c < col + brushSize && c < GRID_WIDTH; c++) {
			cells.push({ row: r, col: c })
		}
	}

	return cells
}
