import createEntityFactory from './base'
import { createLedSprite, createGlow } from '../led'

export default (opts) => {
  const size = 35
  const size2 = 70
  const led = createLedSprite(size)
  const greenGlow = createGlow(0, 1, 0, size2)
  const redGlow = createGlow(1, 0, 0, size2)
  const offset = -((size2 - size) / 2)

  return createEntityFactory({
    ...opts,
    type: 'cell',
    value: opts.value,
    width: size,
    height: size,
    onDown: function () {
      if (this.draggable) return
    },
    render: function () {
      this.context.drawImage(led, 0, 0)
      this.context.drawImage(
        opts.value === -1 ? redGlow : greenGlow,
        offset,
        offset,
      )
    },
  })
}
