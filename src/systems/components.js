import { track } from 'kontra'

const drawDebug = (c) => {
  c.context.fillStyle = 'yellow'
  c.context.strokeStyle = 'red'
  c.context.beginPath()
  c.context.arc(c.x, c.y, 3, 0, 2 * Math.PI)
  c.context.fill()
  c.context.strokeRect(c.x - c.width / 2, c.y - c.height / 2, c.width, c.height)
}

const createComponentSystem = (space) => {
  const getComponents = () =>
    space.entities.filter((e) => e.type === 'component')
  const pointerUp = (e) => getComponents().forEach((c) => c.onUp && c.onUp(e))
  const pointerMove = (e) =>
    getComponents().forEach((c) => c.onMove && c.onMove(e))

  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)

  return {
    addEntity: (entity) => {
      if (entity.type === 'component') {
        track(entity)
      }
    },
    update: () => {
      getComponents().forEach((c) => c.update())
    },
    render: () => {
      getComponents().forEach((c) => {
        c.render()
        space.debug && drawDebug(c)
      })
    },
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
  }
}

export default createComponentSystem
