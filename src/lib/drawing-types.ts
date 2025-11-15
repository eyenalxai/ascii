import type { DrawMode } from "@/lib/grid-utils"

export type Point = {
	row: number
	col: number
}

export type ShapeMode = "ellipse" | "square"

export type ToolSettings = {
	char: string
	brushSize: number
	drawMode: DrawMode
}

export type ShapeState = {
	start: Point | null
	end: Point | null
}
