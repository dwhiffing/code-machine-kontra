import { depthSort, Scene } from 'kontra'
export default () => {
  const systems = []
  let entities = []
  const scene = Scene({
    id: 'game',
    objects: [],
    sortFunction: (a, b) =>
      a.type === 'wire' ? -1 : b.type === 'wire' ? 1 : 0,
  })

  return {
    mode: 0,
    debug: true,
    entities,
    systems,
    addSystem: (system) => {
      systems.push(system)
    },
    addEntity: (entity) => {
      if (!entity) return

      entities.push(entity)
      systems.forEach((system) => system.addEntity(entity))
      scene.add(entity)
    },
    removeEntity: function (entity) {
      if (!entity) return

      this.entities = this.entities.filter((e) => e !== entity)
      scene.remove(entity)
      systems.forEach((system) => system.removeEntity(entity))
    },
    update: () => {
      systems.forEach((c) => c.update())
    },
    render: () => {
      scene.render()
      systems.forEach((c) => c.render())
    },
    shutdown: () => {
      scene.destroy()
      systems.forEach((system) => system.shutdown && system.shutdown())
    },
  }
}
