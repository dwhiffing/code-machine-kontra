import { GameObject } from 'kontra'

export default (opts) =>
  GameObject({
    lastX: 0,
    lastY: 0,
    clickX: 0,
    clickY: 0,
    anchor: { x: 0.5, y: 0.5 },
    editable: false,
    wireable: false,
    selected: false,
    placing: false,
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
        const scale = window.innerWidth / this.context.canvas.width
        const diffPos = {
          x: this.clickPos.offsetX - event.offsetX / scale,
          y: this.clickPos.offsetY - event.offsetY / scale,
        }
        const diff = Math.abs(diffPos.x) + Math.abs(diffPos.y)
        if (diff === 0) {
          // don't select if we're about to place
          if (this.placing) {
            this.placing = false
            this.clickPos = null
            return
          }
          this.selected = !this.selected
        }
      }
      this.clickPos = null
    },
    onDown: function (event) {
      opts.onDown?.call(this)

      const scale = window.innerWidth / this.context.canvas.width
      this.clickPos = {
        x: this.x,
        y: this.y,
        offsetX: event.offsetX / scale,
        offsetY: event.offsetY / scale,
      }
    },
  })
