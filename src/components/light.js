import { createComponent } from './index'
import { createLedSprite, createGlow } from '../led'

const create = function ({ key, x, y }) {
  const size = 35
  const glowSize = 150
  const led = createLedSprite(size)
  const greenGlow = createGlow(0, 1, 0, glowSize)
  return createComponent({
    key,
    x,
    y,
    width: size,
    height: size,
    onDown: function () {
      if (this.draggable) return
    },
    render: function () {
      this.context.drawImage(led, -(size / 2), -(size / 2))
      this.context.drawImage(greenGlow, -(glowSize / 2), -(glowSize / 2))
    },
  })
}

export default create
