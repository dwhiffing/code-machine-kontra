import { GameObject } from 'kontra'

export default (opts) =>
  GameObject({
    lastX: 0,
    lastY: 0,
    clickX: 0,
    clickY: 0,
    anchor: { x: 0.5, y: 0.5 },
    editable: false,
    selected: false,
    interactable: true,
    getTextOffset: function () {
      const textWidth = this.context.measureText(this.key).width
      return {
        x: this.width / 2 - textWidth / 2,
        y: this.height / 2 - 15,
      }
    },
    ...opts,
    render: function () {
      opts.render?.call(this)
      if (!this.editable) return

      this.context.fillStyle = '#fff'
      const { x, y } = this.getTextOffset()
      this.context.fillText(this.key, x, y)
    },
    onMove: function (event) {
      opts.onMove?.call(this, event)
      if (!this.editable || !this.clickPos) return

      const scale = window.innerWidth / this.context.canvas.width
      this.x = this.clickPos.x + (event.offsetX / scale - this.clickPos.offsetX)
      this.y = this.clickPos.y + (event.offsetY / scale - this.clickPos.offsetY)
    },
    onUp: function (event) {
      opts.onUp?.call(this, event)
      if (this.editable) {
        const diffPos = {
          x: this._clickPos.x - event.offsetX,
          y: this._clickPos.y - event.offsetY,
        }
        const diff = Math.abs(diffPos.x) + Math.abs(diffPos.y)
        if (diff === 0) {
          this.selected = !this.selected
        }
      }
      this.clickPos = null
    },
    onDown: function (event) {
      this._clickPos = { x: event.offsetX, y: event.offsetY }
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
