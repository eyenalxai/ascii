import { useState } from "react"
import type { AsciiChar } from "@/lib/ascii-characters"
import { asciiCharacters } from "@/lib/ascii-characters"
import type { DrawMode } from "@/lib/grid-utils"

export const useDrawingTools = () => {
	const [drawMode, setDrawMode] = useState<DrawMode>("draw")
	const [selectedChar, setSelectedChar] = useState<AsciiChar>(
		asciiCharacters[0]
	)
	const [brushSize, setBrushSize] = useState<number>(1)

	return {
		drawMode,
		setDrawMode,
		selectedChar,
		setSelectedChar,
		brushSize,
		setBrushSize
	}
}
