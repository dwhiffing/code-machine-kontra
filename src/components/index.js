import { Sprite } from 'kontra'

export const createComponent = ({
  key,
  x,
  y,
  width,
  height,
  render,
  updateValue,
  onMove,
  onUp,
  onDown,
  value = 0,
  ...rest
}) => {
  return Sprite({
    key,
    x,
    y,
    lastX: 0,
    lastY: 0,
    clickX: 0,
    clickY: 0,
    width,
    height,
    value,
    render: function () {
      if (this.draggable) {
        this.context.fillStyle = '#fff'
        this.context.fillText(this.key, 0, -10)
      }
      render.call(this)
    },
    updateValue: function (key, value) {
      if (!updateValue) {
        this[key] = value
        return
      }
      updateValue.call(this, key, value)
    },
    ...rest,
    onMove: function (event) {
      onMove && onMove.call(this, event)
      if (!this.pointerDown) return

      if (this.draggable) {
        const diffX = event.offsetX - this.clickX
        const diffY = event.offsetY - this.clickY
        this.x = this.lastX + diffX
        this.y = this.lastY + diffY
      }
    },
    onUp: function (event) {
      onMove && onMove.call(this, event)
      this.pointerDown = false
    },
    onDown: function (event) {
      onDown && onDown.call(this, event)
      this.pointerDown = true
      this.lastX = this.x
      this.lastY = this.y
      this.clickX = event.offsetX
      this.clickY = event.offsetY
    },
  })
}