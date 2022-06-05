import { createComponent } from './index'

const create = ({ ...rest }) => {
  return createComponent({
    ...rest,
    x: 0,
    y: 0,
    anchor: { x: 0, y: 0 },
    width: 0,
    height: 0,
    render: function () {
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
