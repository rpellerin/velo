import GpxMap from './map'
import { initializeUi } from './ui'

document.addEventListener('DOMContentLoaded', () => {
  const map = new GpxMap()
  initializeUi(map)
  ;(function () {
    let currentFocusedElementIndex = -1
    const focusableElements = Array.from(document.querySelectorAll('.tile[tabindex]'))
    window.addEventListener('keypress', (e) => {
      if (e.code === 'KeyJ') {
        currentFocusedElementIndex = Math.min(currentFocusedElementIndex + 1, focusableElements.length - 1)
      }
      if (e.code === 'KeyK') {
        currentFocusedElementIndex = Math.max(currentFocusedElementIndex - 1, 0)
      }
      focusableElements[currentFocusedElementIndex].scrollIntoView({ behavior: 'smooth' })
    })
  })()
})
