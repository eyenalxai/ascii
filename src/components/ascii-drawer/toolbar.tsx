import { Circle, Copy, Eraser, Pencil, Square, Trash2 } from "lucide-react"
import { CharacterSelector } from "@/components/ascii-drawer/character-selector"
import { Button } from "@/components/ui/button"
import {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator
} from "@/components/ui/toolbar"
import type { AsciiChar } from "@/lib/ascii-characters"

type ToolbarProps = {
	drawMode: "draw" | "erase" | "ellipse" | "square"
	onDrawModeChange: (mode: "draw" | "erase" | "ellipse" | "square") => void
	onClear: () => void
	onExport: () => void
	selectedChar: AsciiChar
	onCharChange: (char: AsciiChar) => void
	brushSize: number
	onBrushSizeChange: (size: number) => void
}

export function AsciiToolbar({
	drawMode,
	onDrawModeChange,
	onClear,
	onExport,
	selectedChar,
	onCharChange,
	brushSize,
	onBrushSizeChange
}: ToolbarProps) {
	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-2 max-w-md w-fit rounded-xl">
			<Toolbar>
				<ToolbarGroup>
					<ToolbarButton
						render={
							<Button
								variant={drawMode === "draw" ? "default" : "outline"}
								onClick={() => onDrawModeChange("draw")}
							/>
						}
					>
						<Pencil />
					</ToolbarButton>
					<ToolbarButton
						render={
							<Button
								variant={drawMode === "erase" ? "default" : "outline"}
								onClick={() => onDrawModeChange("erase")}
							/>
						}
					>
						<Eraser />
					</ToolbarButton>
					<ToolbarButton
						render={
							<Button
								variant={drawMode === "ellipse" ? "default" : "outline"}
								onClick={() => onDrawModeChange("ellipse")}
							/>
						}
					>
						<Circle />
					</ToolbarButton>
					<ToolbarButton
						render={
							<Button
								variant={drawMode === "square" ? "default" : "outline"}
								onClick={() => onDrawModeChange("square")}
							/>
						}
					>
						<Square />
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton
						render={
							<Button
								variant={brushSize === 1 ? "default" : "outline"}
								onClick={() => onBrushSizeChange(1)}
								size="sm"
							/>
						}
					>
						1x1
					</ToolbarButton>
					<ToolbarButton
						render={
							<Button
								variant={brushSize === 2 ? "default" : "outline"}
								onClick={() => onBrushSizeChange(2)}
								size="sm"
							/>
						}
					>
						2x2
					</ToolbarButton>
					<ToolbarButton
						render={
							<Button
								variant={brushSize === 3 ? "default" : "outline"}
								onClick={() => onBrushSizeChange(3)}
								size="sm"
							/>
						}
					>
						3x3
					</ToolbarButton>
					<ToolbarButton
						render={
							<Button
								variant={brushSize === 4 ? "default" : "outline"}
								onClick={() => onBrushSizeChange(4)}
								size="sm"
							/>
						}
					>
						4x4
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<CharacterSelector
						selectedChar={selectedChar}
						onCharChange={onCharChange}
					/>
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton
						render={<Button variant="outline" onClick={onClear} />}
					>
						<Trash2 />
					</ToolbarButton>
					<ToolbarButton
						render={<Button variant="outline" onClick={onExport} />}
					>
						<Copy />
					</ToolbarButton>
				</ToolbarGroup>
			</Toolbar>
		</div>
	)
}
