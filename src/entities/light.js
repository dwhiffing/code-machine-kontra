import createEntityFactory from './base'
import { createLedSprite, createGlow } from '../led'

export default (opts) => {
  const size = 50
  const size2 = 150
  const led = createLedSprite(size)
  const glow = createGlow(1, 1, 0, size2)
  const offset = -((size2 - size) / 2)

  return createEntityFactory({
    ...opts,
    type: 'light',
    width: size,
    height: size,
    value: 0,
    onDown: function () {
      if (this.editable) return
    },
    render: function () {
      this.context.drawImage(led, 0, 0)
      this.context.lineWidth = 5
      if (this.value) this.context.drawImage(glow, offset, offset)
      if (this.selected) {
        this.context.beginPath()
        const w = this.width / 2
        this.context.arc(w, w, w, 0, 2 * Math.PI)
        this.context.strokeStyle = 'white'
        this.context.stroke()
      }
    },
  })
}
