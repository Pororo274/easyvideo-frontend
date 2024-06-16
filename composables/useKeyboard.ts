import type { Key } from "~/enums/keyboard/key.enum";


interface KeyboardListener {
  key: Key;
  handler: () => void
}

export const useKeyboard = () => {
  const isShifted = useState("isShifted", () => false)
  const listeners = useState<KeyboardListener[]>(() => [])


  const addOnDownListener = (listener: KeyboardListener) => {
    listeners.value = [...listeners.value, listener]
  }

  const initKeyboard = () => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'Shift') {
        isShifted.value = true
      }

      listeners.value.forEach((listener) => {
        if (listener.key === e.key) {
          listener.handler()
        }
      })
    })

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        isShifted.value = false
      }
    })
  } 

  return {
    initKeyboard,
    isShifted: readonly(isShifted),
    addOnDownListener
  }
}