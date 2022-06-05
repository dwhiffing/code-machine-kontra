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
      this.context.drawImage(led, 0, 0)
      this.context.drawImage(
        greenGlow,
        -((glowSize - size) / 2),
        -((glowSize - size) / 2),
      )
    },
  })
}

export default create
