import createEntityFactory from './base'

export default (opts) =>
  createEntityFactory({
    ...opts,
    type: 'connection',
    x: 0,
    y: 0,
    anchor: { x: 0, y: 0 },
    width: 0,
    height: 0,
    timer: 10,
    update: function () {
      this.value = this.input.value ? 1 : 0
      if (this.output.type === 'node' || this.output.type === 'light')
        this.output.value = this.value
    },
    render: function () {
      this.context.strokeStyle = this.value ? '#555500' : '#333'
      this.context.lineWidth = 4

      this.context.beginPath()
      this.context.moveTo(this.input.x, this.input.y)
      this.context.lineTo(this.output.x, this.output.y)
      this.context.stroke()

      this.context.moveTo(this.input.x, this.input.y)
    },
  })
