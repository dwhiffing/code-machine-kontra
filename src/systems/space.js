import { Scene } from 'kontra'
export default () => {
  const scene = Scene({
    id: 'game',
    objects: [],
    sortFunction: (a, b) =>
      a.type === 'wire' ? -1 : b.type === 'wire' ? 1 : 0,
  })

  scene.camera.x += 200

  return {
    mode: 0,
    debug: true,
    entities: [],
    systems: [],
    scene,
    addSystem: function (system) {
      this.systems.push(system)
    },
    addEntity: function (entity) {
      if (!entity) return

      this.entities.push(entity)
      this.systems.forEach((system) => system.addEntity(entity))
      this.scene.add(entity)
    },
    removeEntity: function (entity) {
      if (!entity) return

      this.entities = this.entities.filter((e) => e !== entity)
      this.scene.remove(entity)
      this.systems.forEach((system) => system.removeEntity(entity))
    },
    update: function () {
      this.systems.forEach((c) => c.update())
    },
    render: function () {
      this.scene.render()
      this.systems.forEach((c) => c.render())
    },
    shutdown: function () {
      this.scene.destroy()
      this.systems.forEach((system) => system.shutdown && system.shutdown())
    },
  }
}
