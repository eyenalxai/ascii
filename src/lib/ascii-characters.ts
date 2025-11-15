export type AsciiChar = {
	char: string
	category: string
}

export const asciiCharacters: AsciiChar[] = [
	// Shapes & Symbols - Blocks
	{ char: "█", category: "shapes" },
	{ char: "▓", category: "shapes" },
	{ char: "▒", category: "shapes" },
	{ char: "░", category: "shapes" },
	{ char: "▀", category: "shapes" },
	{ char: "▄", category: "shapes" },
	{ char: "▌", category: "shapes" },
	{ char: "▐", category: "shapes" },

	// Shapes & Symbols - Squares
	{ char: "■", category: "shapes" },
	{ char: "□", category: "shapes" },
	{ char: "▪", category: "shapes" },
	{ char: "▫", category: "shapes" },

	// Shapes & Symbols - Circles
	{ char: "●", category: "shapes" },
	{ char: "○", category: "shapes" },
	{ char: "•", category: "shapes" },
	{ char: "◦", category: "shapes" },
	{ char: "∙", category: "shapes" },

	// Shapes & Symbols - Diamonds
	{ char: "◆", category: "shapes" },
	{ char: "◇", category: "shapes" },

	// Shapes & Symbols - Triangles
	{ char: "▲", category: "shapes" },
	{ char: "△", category: "shapes" },
	{ char: "▼", category: "shapes" },
	{ char: "▽", category: "shapes" },
	{ char: "◀", category: "shapes" },
	{ char: "▶", category: "shapes" },

	// Shapes & Symbols - Other
	{ char: "▬", category: "shapes" },

	// Arrows
	{ char: "→", category: "symbols" },
	{ char: "←", category: "symbols" },
	{ char: "↑", category: "symbols" },
	{ char: "↓", category: "symbols" },
	{ char: "↗", category: "symbols" },
	{ char: "↘", category: "symbols" },
	{ char: "↙", category: "symbols" },
	{ char: "↖", category: "symbols" },
	{ char: "⇒", category: "symbols" },
	{ char: "⇐", category: "symbols" },

	// Lines & Borders - Single
	{ char: "─", category: "lines" },
	{ char: "│", category: "lines" },
	{ char: "┌", category: "lines" },
	{ char: "┐", category: "lines" },
	{ char: "└", category: "lines" },
	{ char: "┘", category: "lines" },
	{ char: "├", category: "lines" },
	{ char: "┤", category: "lines" },
	{ char: "┬", category: "lines" },
	{ char: "┴", category: "lines" },
	{ char: "┼", category: "lines" },

	// Lines & Borders - Double
	{ char: "═", category: "lines" },
	{ char: "║", category: "lines" },
	{ char: "╔", category: "lines" },
	{ char: "╗", category: "lines" },
	{ char: "╚", category: "lines" },
	{ char: "╝", category: "lines" },
	{ char: "╬", category: "lines" },

	// Special Characters
	{ char: "★", category: "symbols" },
	{ char: "☆", category: "symbols" },
	{ char: "♥", category: "symbols" },
	{ char: "♡", category: "symbols" },
	{ char: "♪", category: "symbols" },
	{ char: "♫", category: "symbols" },
	{ char: "☀", category: "symbols" },
	{ char: "☁", category: "symbols" },
	{ char: "☂", category: "symbols" },
	{ char: "☃", category: "symbols" },
	{ char: "✓", category: "symbols" },
	{ char: "✗", category: "symbols" },
	{ char: "✦", category: "symbols" },
	{ char: "✧", category: "symbols" },

	// Letters & Numbers
	{ char: "A", category: "text" },
	{ char: "B", category: "text" },
	{ char: "C", category: "text" },
	{ char: "X", category: "text" },
	{ char: "O", category: "text" },
	{ char: "0", category: "text" },
	{ char: "1", category: "text" },
	{ char: "2", category: "text" },

	// Punctuation & Symbols
	{ char: ".", category: "symbols" },
	{ char: ",", category: "symbols" },
	{ char: ":", category: "symbols" },
	{ char: ";", category: "symbols" },
	{ char: "!", category: "symbols" },
	{ char: "?", category: "symbols" },
	{ char: "#", category: "symbols" },
	{ char: "@", category: "symbols" },
	{ char: "*", category: "symbols" },
	{ char: "+", category: "symbols" },
	{ char: "-", category: "symbols" },
	{ char: "=", category: "symbols" },
	{ char: "/", category: "symbols" },
	{ char: "\\", category: "symbols" },
	{ char: "|", category: "symbols" },
	{ char: "~", category: "symbols" },
	{ char: "^", category: "symbols" },
	{ char: "_", category: "symbols" }
]
