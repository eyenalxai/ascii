"use client"

import { DrawingGrid } from "@/components/ascii-drawer/drawing-grid"
import { AsciiToolbar } from "@/components/ascii-drawer/toolbar"
import { useAsciiDrawer } from "@/hooks/use-ascii-drawer"

export default function Page() {
	const {
		grid,
		drawMode,
		setDrawMode,
		selectedChar,
		setSelectedChar,
		brushSize,
		setBrushSize,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		clearGrid,
		exportAscii,
		emptyChar
	} = useAsciiDrawer()

	return (
		<main className="container mx-auto max-w-2xl pt-24 flex justify-center">
			<AsciiToolbar
				drawMode={drawMode}
				onDrawModeChange={setDrawMode}
				onClear={clearGrid}
				onExport={exportAscii}
				selectedChar={selectedChar}
				onCharChange={setSelectedChar}
				brushSize={brushSize}
				onBrushSizeChange={setBrushSize}
			/>
			<DrawingGrid
				grid={grid}
				emptyChar={emptyChar}
				onMouseDown={handleMouseDown}
				onMouseEnter={handleMouseEnter}
				onMouseUp={handleMouseUp}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			/>
		</main>
	)
}
