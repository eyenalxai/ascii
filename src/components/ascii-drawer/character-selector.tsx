"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import { type AsciiChar, asciiCharacters } from "@/lib/ascii-characters"
import { cn } from "@/lib/utils"

type CharacterSelectorProps = {
	selectedChar: AsciiChar
	onCharChange: (char: AsciiChar) => void
}

export function CharacterSelector({
	selectedChar,
	onCharChange
}: CharacterSelectorProps) {
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [open, setOpen] = useState(false)

	const categories = useMemo(() => {
		const uniqueCategories = Array.from(
			new Set(asciiCharacters.map((char) => char.category))
		).toSorted()

		return [
			{ id: "all", label: "All" },
			...uniqueCategories.map((category) => ({
				id: category,
				label: category.charAt(0).toUpperCase() + category.slice(1)
			}))
		]
	}, [])

	const filteredCharacters = useMemo(() => {
		if (selectedCategory === "all") {
			return asciiCharacters
		}
		return asciiCharacters.filter((char) => char.category === selectedCategory)
	}, [selectedCategory])

	const handleCharSelect = (char: AsciiChar) => {
		onCharChange(char)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger render={<Button variant="outline" />}>
				{selectedChar.char}
			</PopoverTrigger>
			<PopoverContent className="flex items-center p-2" align="center">
				<Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
					<TabsList className="w-full mx-auto">
						<div className="flex overflow-x-auto">
							{categories.map((category) => (
								<TabsTab key={category.id} value={category.id}>
									{category.label}
								</TabsTab>
							))}
						</div>
					</TabsList>
					<TabsPanel value={selectedCategory}>
						<ScrollArea className="h-[320px]">
							<div className="grid grid-cols-6 gap-2">
								{filteredCharacters.map((char) => (
									<button
										key={char.char}
										type="button"
										onClick={() => handleCharSelect(char)}
										className={cn(
											"aspect-square rounded-md border p-0.5 flex items-center justify-center font-mono text-xl",
											selectedChar.char === char.char
												? "bg-primary text-primary-foreground border-primary"
												: "border-border bg-background"
										)}
										title={char.char}
									>
										{char.char}
									</button>
								))}
							</div>
						</ScrollArea>
					</TabsPanel>
				</Tabs>
			</PopoverContent>
		</Popover>
	)
}
