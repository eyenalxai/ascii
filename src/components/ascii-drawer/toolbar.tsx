import {
	Circle,
	Copy,
	Eraser,
	Pencil,
	Settings,
	Square,
	Trash2
} from "lucide-react"
import { BrushSizeSelector } from "@/components/ascii-drawer/brush-size-selector"
import { CharacterSelector } from "@/components/ascii-drawer/character-selector"
import { Button } from "@/components/ui/button"
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
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
		<Popover>
			<PopoverTrigger
				render={
					<Button variant="outline" className="fixed top-4 right-4 z-50" />
				}
			>
				<Settings />
			</PopoverTrigger>
			<PopoverPopup className="flex flex-col">
				<div className="flex flex-col items-center gap-2 pb-2">
					<Button
						variant={drawMode === "draw" ? "default" : "outline"}
						onClick={() => onDrawModeChange("draw")}
						className="w-13"
					>
						<Pencil />
					</Button>
					<Button
						variant={drawMode === "erase" ? "default" : "outline"}
						onClick={() => onDrawModeChange("erase")}
						className="w-13"
					>
						<Eraser />
					</Button>
					<Button
						variant={drawMode === "ellipse" ? "default" : "outline"}
						onClick={() => onDrawModeChange("ellipse")}
						className="w-13"
					>
						<Circle />
					</Button>
					<Button
						variant={drawMode === "square" ? "default" : "outline"}
						onClick={() => onDrawModeChange("square")}
						className="w-13"
					>
						<Square />
					</Button>
				</div>
				<Separator />
				<div className="flex flex-col items-center gap-2 py-2">
					<BrushSizeSelector
						brushSize={brushSize}
						onBrushSizeChange={onBrushSizeChange}
					/>
				</div>
				<Separator />
				<div className="flex flex-col items-center gap-2 py-2">
					<CharacterSelector
						selectedChar={selectedChar}
						onCharChange={onCharChange}
					/>
				</div>
				<Separator />
				<div className="flex flex-col items-center gap-2 pt-2">
					<Button variant="outline" onClick={onClear} className="w-13">
						<Trash2 />
					</Button>
					<Button variant="outline" onClick={onExport} className="w-13">
						<Copy />
					</Button>
				</div>
			</PopoverPopup>
		</Popover>
	)
}
