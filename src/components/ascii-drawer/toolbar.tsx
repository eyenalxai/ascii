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
}

export function AsciiToolbar({
	drawMode,
	onDrawModeChange,
	onClear,
	onExport,
	selectedChar,
	onCharChange
}: ToolbarProps) {
	return (
		<Toolbar className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm rounded-xl">
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
				<ToolbarButton render={<Button variant="outline" onClick={onClear} />}>
					<Trash2 />
				</ToolbarButton>
				<ToolbarButton render={<Button variant="outline" onClick={onExport} />}>
					<Copy />
				</ToolbarButton>
			</ToolbarGroup>
			<ToolbarSeparator />
			<ToolbarGroup>
				<CharacterSelector
					selectedChar={selectedChar}
					onCharChange={onCharChange}
				/>
			</ToolbarGroup>
		</Toolbar>
	)
}
