export const useKeyboard = () => {
  const isShifted = useState("isShifted", () => false)
  const initKeyboard = () => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'Shift') {
        isShifted.value = true
      }
    })

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        isShifted.value = false
      }
    })
  } 

  return {
    initKeyboard,
    isShifted: readonly(isShifted)
  }
}