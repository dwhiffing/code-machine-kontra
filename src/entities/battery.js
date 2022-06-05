import createEntityFactory from './base'
import { createLedSprite, createGlow } from '../led'

export default (opts) => {
  const size = 35
  const size2 = 150
  const led = createLedSprite(size)
  const glow = createGlow(0, 0, 1, size2)
  const offset = -((size2 - size) / 2)

  return createEntityFactory({
    ...opts,
    type: 'battery',
    value: 1,
    width: size,
    height: size,
    onDown: function () {
      if (this.draggable) return
    },
    render: function () {
      this.context.drawImage(led, 0, 0)
      this.context.drawImage(glow, offset, offset)
    },
  })
}
