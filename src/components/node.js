import { createComponent } from './index'

const create = function ({ key, x, y }) {
  const size = 30
  return createComponent({
    key,
    x,
    y,
    width: size,
    height: size,
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
      }
    },
    onDown: function () {
      if (this.draggable) return
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = size / 5

      this.context.strokeRect(-(size / 2), -(size / 2), size, size)
    },
  })
}

export default create
