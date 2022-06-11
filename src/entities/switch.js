import createEntityFactory from './base'

export default (opts) => {
  const size = 60
  return createEntityFactory({
    ...opts,
    type: 'switch',
    width: size,
    height: size,
    value: 0,
    onDown: function () {
      if (!this.interactable) return
      this.value = this.value ? 0 : 1
    },
    render: function () {
      this.context.fillStyle = this.value ? 'white' : '#333'
      this.context.beginPath()
      this.context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
      this.context.fill()
      if (this.selected) {
        this.context.lineWidth = 5
        this.context.strokeStyle = 'white'
        this.context.stroke()
      }
    },
  })
}
