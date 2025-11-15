"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

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
			<PopoverTrigger render={<Button variant="outline" />}>
				{brushSize}x{brushSize}
			</PopoverTrigger>
			<PopoverContent className="w-fit p-2" align="center">
				<div className="grid grid-cols-2 gap-2">
					{BRUSH_SIZES.map((size) => (
						<button
							key={size}
							type="button"
							onClick={() => handleSizeSelect(size)}
							className={cn(
								"aspect-square rounded-md border px-4 py-2 flex items-center justify-center text-sm font-medium",
								brushSize === size
									? "bg-primary text-primary-foreground border-primary"
									: "border-border bg-background hover:bg-accent"
							)}
						>
							{size}x{size}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
