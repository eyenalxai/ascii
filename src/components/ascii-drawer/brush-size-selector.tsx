"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"

type BrushSizeSelectorProps = {
	brushSize: number
	onBrushSizeChange: (size: number) => void
}

const BRUSH_SIZES = [1, 2, 3, 4]

const SizeGrid = ({ size }: { size: number }) => {
	const rows = Array.from({ length: size }, (_, i) => i)
	const cols = Array.from({ length: size }, (_, i) => i)

	return (
		<div className="flex flex-col gap-px">
			{rows.map((rowIndex) => (
				<div key={`row-${rowIndex}`} className="flex gap-px">
					{cols.map((colIndex) => (
						<div
							key={`row-${rowIndex}-col-${colIndex}`}
							className="w-[3px] h-[3px] bg-current"
						/>
					))}
				</div>
			))}
		</div>
	)
}

export function BrushSizeSelector({
	brushSize,
	onBrushSizeChange
}: BrushSizeSelectorProps) {
	const [open, setOpen] = useState(false)

	const handleSizeSelect = (size: number) => {
		onBrushSizeChange(size)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger render={<Button variant="outline" className="size-8" />}>
				<SizeGrid size={brushSize} />
			</PopoverTrigger>
			<PopoverContent className="w-fit" align="center">
				<div className="flex flex-col gap-1">
					{BRUSH_SIZES.map((size) => (
						<Button
							key={size}
							type="button"
							onClick={() => handleSizeSelect(size)}
							variant={brushSize === size ? "default" : "outline"}
							className="size-8"
						>
							<SizeGrid size={size} />
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
