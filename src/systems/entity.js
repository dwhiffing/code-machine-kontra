import { track } from 'kontra'

export default (space) => {
  const addEntity = (entity) => {
    track(entity)
  }

  const update = () => {
    space.entities.forEach((c) => c.update())
  }

  const render = () => {
    space.entities.forEach((c) => {
      c.render()
      if (space.debug) drawDebug(c)
    })
  }

  const pointerUp = (e) => space.entities.forEach((c) => c?.onUp(e))
  const pointerMove = (e) => space.entities.forEach((c) => c?.onMove(e))
  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)

  return {
    addEntity,
    update,
    render,
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
  }
}

const drawDebug = (c) => {
  c.context.fillStyle = 'yellow'
  c.context.strokeStyle = 'red'
  c.context.beginPath()
  c.context.arc(c.x, c.y, 3, 0, 2 * Math.PI)
  c.context.fill()
  c.context.strokeRect(c.x - c.width / 2, c.y - c.height / 2, c.width, c.height)
}
