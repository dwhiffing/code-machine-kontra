import createEntityFactory from './base'

export default (opts) => {
  const size = 15
  return createEntityFactory({
    ...opts,
    type: 'node',
    width: size,
    height: size,
    value: 0,
    onDown: function () {
      if (this.draggable) return
    },
    render: function () {
      this.context.fillStyle = this.draggable
        ? 'white'
        : this.value
        ? 'yellow'
        : '#999'
      this.context.lineWidth = 2
      this.context.fillRect(0, 0, size, size)
    },
  })
}
