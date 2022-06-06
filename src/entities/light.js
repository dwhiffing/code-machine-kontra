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
      if (this.draggable) return
    },
    render: function () {
      this.context.drawImage(led, 0, 0)
      if (this.value) this.context.drawImage(glow, offset, offset)
    },
  })
}
