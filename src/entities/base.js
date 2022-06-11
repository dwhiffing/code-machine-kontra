import { GameObject } from 'kontra'

export default (opts) =>
  GameObject({
    lastX: 0,
    lastY: 0,
    clickX: 0,
    clickY: 0,
    anchor: { x: 0.5, y: 0.5 },
    ...opts,
    render: function () {
      opts.render?.call(this)
      if (!this.editable) return

      this.context.fillStyle = '#fff'
      const textWidth = this.context.measureText(this.key).width
      let pos = this.width / 2 - textWidth / 2
      if (this.type === 'wire') {
        pos = textWidth / 2
        pos *= -1
      }
      this.context.fillText(this.key, pos, -10)
    },
    onMove: function (event) {
      opts.onMove?.call(this, event)
      if (!this.editable || !this.clickPos) return

      const scale = window.innerWidth / this.context.canvas.width
      this.x = this.clickPos.x + (event.offsetX / scale - this.clickPos.offsetX)
      this.y = this.clickPos.y + (event.offsetY / scale - this.clickPos.offsetY)
    },
    onUp: function (event) {
      opts.onMove?.call(this, event)

      this.clickPos = null
    },
    onDown: function (event) {
      opts.onDown?.call(this, event)

      const scale = window.innerWidth / this.context.canvas.width
      this.clickPos = {
        x: this.x,
        y: this.y,
        offsetX: event.offsetX / scale,
        offsetY: event.offsetY / scale,
      }
    },
  })
