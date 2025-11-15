import { Circle, Copy, Eraser, Pencil, Square, Trash2 } from "lucide-react"
import { BrushSizeSelector } from "@/components/ascii-drawer/brush-size-selector"
import { CharacterSelector } from "@/components/ascii-drawer/character-selector"
import { Button } from "@/components/ui/button"
import {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator
} from "@/components/ui/toolbar"
import type { AsciiChar } from "@/lib/ascii-characters"
import type { DrawMode } from "@/lib/grid-utils"

type ToolbarProps = {
	drawMode: DrawMode
	onDrawModeChange: (mode: DrawMode) => void
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
					<BrushSizeSelector
						brushSize={brushSize}
						onBrushSizeChange={onBrushSizeChange}
					/>
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
