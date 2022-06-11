import createEntityFactory from './base'

export default (opts) =>
  createEntityFactory({
    ...opts,
    type: 'wire',
    getDiff: () => ({
      diffX: opts.output.x - opts.input.x,
      diffY: opts.output.y - opts.input.y,
    }),
    update: function () {
      const { diffX, diffY } = this.getDiff()
      this.x = opts.input.x + diffX / 2
      this.y = opts.input.y + diffY / 2
    },
    render: function () {
      const { diffX, diffY } = this.getDiff()
      const oX = diffX / 2
      const oY = diffY / 2
      this.context.strokeStyle = this.value ? '#555500' : '#333'
      this.context.lineWidth = 4
      this.context.beginPath()
      this.context.moveTo(-oX, -oY)
      this.context.lineTo(oX, oY)
      this.context.stroke()
    },
  })
