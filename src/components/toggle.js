import { createComponent } from './index'

const createToggle = ({ key, x, y, value = 0 }) => {
  const size = 30
  return createComponent({
    key,
    x,
    y,
    value,
    width: size,
    height: size,
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        value: this.value || undefined,
      }
    },
    onDown: function () {
      if (this.draggable) return
      this.value = this.value ? 0 : 1
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = size / 5

      this.context.beginPath()
      this.context.arc(0, 0, size, 0, 2 * Math.PI)
      this.context.stroke()
      this.value && this.context.fill()
    },
  })
}

export default createToggle
