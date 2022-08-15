import createEntityFactory from './base'

export default (opts) =>
  createEntityFactory({
    ...opts,
    anchor: { x: 0.5, y: 0.5 },
    type: 'wire',
    getDiff: () => ({
      diffX: opts.output.x - opts.input.x,
      diffY: opts.output.y - opts.input.y,
    }),
    update: function () {
      const { diffX, diffY } = this.getDiff()
      const size = 20
      this.width = size
      this.height = size
      this.x = opts.input.x + diffX / 2
      this.y = opts.input.y + diffY / 2
    },
    render: function () {
      const { diffX, diffY } = this.getDiff()
      const oX = diffX / 2
      const oY = diffY / 2
      this.context.strokeStyle = this.selected
        ? 'white'
        : this.value
        ? '#555500'
        : '#333'
      this.context.lineWidth = 4
      this.context.beginPath()
      const w = this.width / 2
      this.context.moveTo(w + -oX, w + -oY)
      this.context.lineTo(w + diffX / 2, w + diffY / 2)
      this.context.stroke()
    },
  })
