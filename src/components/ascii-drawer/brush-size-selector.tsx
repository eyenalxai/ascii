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
				{brushSize}
			</PopoverTrigger>
			<PopoverContent className="w-fit" align="center">
				<div className="flex flex-col gap-2">
					{BRUSH_SIZES.map((size) => (
						<Button
							key={size}
							type="button"
							onClick={() => handleSizeSelect(size)}
							variant={brushSize === size ? "default" : "outline"}
						>
							{size}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
