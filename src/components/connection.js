import { createComponent } from './index'

const create = ({ key, x = 0, y = 0, ...rest }) => {
  return createComponent({
    ...rest,
    key,
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        value: this.value || undefined,
      }
    },
    render: function () {
      this.context.fillStyle = 'white'
      this.context.strokeStyle = 'white'
      this.context.lineWidth = 2
      this.context.beginPath()
      this.context.moveTo(this.input.x, this.input.y)
      this.context.lineTo(this.output.x, this.output.y)
      this.context.stroke()
      this.context.moveTo(this.input.x, this.input.y)
    },
  })
}

export default create
