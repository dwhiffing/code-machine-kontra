import { createEntityFactory } from './index'

export default (opts) => {
  const size = 30
  return createEntityFactory({
    ...opts,
    type: 'node',
    width: size,
    height: size,
    onDown: function () {
      if (this.draggable) return
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = 2
      this.context.strokeRect(0, 0, size, size)
    },
  })
}
