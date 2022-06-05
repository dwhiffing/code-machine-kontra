import createEntityFactory from './base'

export default (opts) => {
  const size = 30
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
      this.context.strokeStyle = this.draggable
        ? 'gray'
        : this.value
        ? 'red'
        : 'white'
      this.context.fillStyle = this.draggable
        ? 'gray'
        : this.value
        ? 'red'
        : 'white'
      this.context.lineWidth = 2
      this.context.strokeRect(0, 0, size, size)
    },
  })
}
