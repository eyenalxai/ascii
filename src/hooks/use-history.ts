import { useCallback, useState } from "react"

type HistoryState<T> = {
	past: T[]
	present: T
	future: T[]
}

export const useHistory = <T>(initialState: T) => {
	const [history, setHistory] = useState<HistoryState<T>>({
		past: [],
		present: initialState,
		future: []
	})

	const setState = useCallback((newState: T) => {
		setHistory((prev) => ({
			...prev,
			present: newState
		}))
	}, [])

	const captureState = useCallback((newState: T) => {
		setHistory((prev) => ({
			past: [...prev.past, prev.present],
			present: newState,
			future: []
		}))
	}, [])

	const undo = useCallback(() => {
		setHistory((prev) => {
			if (prev.past.length === 0) return prev

			const previous = prev.past.at(-1)
			if (previous === undefined) return prev
			const newPast = prev.past.slice(0, -1)

			return {
				past: newPast,
				present: previous,
				future: [prev.present, ...prev.future]
			}
		})
	}, [])

	const redo = useCallback(() => {
		setHistory((prev) => {
			if (prev.future.length === 0) return prev

			const next = prev.future[0]
			if (next === undefined) return prev
			const newFuture = prev.future.slice(1)

			return {
				past: [...prev.past, prev.present],
				present: next,
				future: newFuture
			}
		})
	}, [])

	const canUndo = history.past.length > 0
	const canRedo = history.future.length > 0

	return {
		state: history.present,
		setState,
		captureState,
		undo,
		redo,
		canUndo,
		canRedo
	}
}
