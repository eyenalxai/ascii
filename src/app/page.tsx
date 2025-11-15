"use client"

import { useEffect } from "react"
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
		handleMouseLeave,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		clearGrid,
		exportAscii,
		emptyChar,
		isGridEmpty,
		undo,
		redo,
		canUndo,
		canRedo,
		gridRef
	} = useAsciiDrawer()

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
				e.preventDefault()
				undo()
			} else if (
				((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") ||
				((e.ctrlKey || e.metaKey) && e.key === "y")
			) {
				e.preventDefault()
				redo()
			} else if ((e.ctrlKey || e.metaKey) && e.key === "c") {
				e.preventDefault()
				exportAscii()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [undo, redo, exportAscii])

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
				onUndo={undo}
				onRedo={redo}
				canUndo={canUndo}
				canRedo={canRedo}
				isGridEmpty={isGridEmpty}
			/>
			<DrawingGrid
				grid={grid}
				emptyChar={emptyChar}
				drawMode={drawMode}
				onMouseDown={handleMouseDown}
				onMouseEnter={handleMouseEnter}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				gridRef={gridRef}
			/>
		</main>
	)
}
