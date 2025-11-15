type Cell = {
	id: string
	char: string
	row: number
	col: number
}

type DrawingGridProps = {
	grid: Cell[][]
	emptyChar: string
	onMouseDown: (row: number, col: number) => void
	onMouseEnter: (row: number, col: number) => void
	onMouseUp: () => void
	onTouchStart: (e: React.TouchEvent, row: number, col: number) => void
	onTouchMove: (e: React.TouchEvent) => void
	onTouchEnd: () => void
}

export function DrawingGrid({
	grid,
	emptyChar,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
	onTouchStart,
	onTouchMove,
	onTouchEnd
}: DrawingGridProps) {
	return (
		<div
			role="application"
			className="inline-block select-none border-2 border-border overflow-x-auto max-w-full touch-none"
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			onTouchCancel={onTouchEnd}
		>
			{grid.map((row) => (
				<div key={`row-${row[0]?.id || "empty"}`} className="flex">
					{row.map((cell) => (
						<button
							key={cell.id}
							type="button"
							className={`h-5 w-2.5 md:h-8 md:w-4 border border-border transition-colors flex items-center justify-center font-mono ${
								cell.char === emptyChar
									? "bg-background hover:bg-muted"
									: "bg-background text-foreground"
							}`}
							data-row={cell.row}
							data-col={cell.col}
							onMouseDown={() => onMouseDown(cell.row, cell.col)}
							onMouseEnter={() => onMouseEnter(cell.row, cell.col)}
							onTouchStart={(e) => onTouchStart(e, cell.row, cell.col)}
						>
							{cell.char !== emptyChar && cell.char}
						</button>
					))}
				</div>
			))}
		</div>
	)
}
