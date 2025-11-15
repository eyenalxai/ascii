import type { Cell, DrawMode } from "@/lib/grid-utils"

type DrawingGridProps = {
	grid: Cell[][]
	emptyChar: string
	drawMode: DrawMode
	onMouseDown: (row: number, col: number) => void
	onMouseEnter: (row: number, col: number) => void
	onMouseUp: () => void
	onMouseLeave: () => void
	onTouchStart: (e: React.TouchEvent, row: number, col: number) => void
	onTouchMove: (e: React.TouchEvent) => void
	onTouchEnd: () => void
}

export function DrawingGrid({
	grid,
	emptyChar,
	drawMode,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
	onMouseLeave,
	onTouchStart,
	onTouchMove,
	onTouchEnd
}: DrawingGridProps) {
	const handleMouseLeave = () => {
		onMouseUp()
		onMouseLeave()
	}

	return (
		<div
			role="application"
			className={`inline-block select-none border-2 border-border rounded-lg overflow-x-auto max-w-full touch-none ${drawMode === "move" ? "cursor-move" : ""}`}
			onMouseUp={onMouseUp}
			onMouseLeave={handleMouseLeave}
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
							className={`h-5 w-2.5 text-md sm:h-7 sm:w-4 sm:text-xl lg:h-10 lg:w-5 lg:text-3xl overflow-hidden border border-border/30 transition-colors flex items-center justify-center font-mono ${
								cell.isHoverPreview === true
									? "bg-muted/50 text-foreground/70"
									: cell.char === emptyChar
										? `bg-background ${drawMode !== "move" ? "hover:bg-muted" : ""}`
										: "bg-background text-foreground"
							} ${drawMode === "move" ? "cursor-move" : ""}`}
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
