import { createComponent } from './index'

const create = function ({ key, x, y }) {
  const size = 30
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
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = 2
      this.context.strokeRect(0, 0, size, size)
    },
  })
}

export default create
