export default () => {
  const systems = []
  const entities = []

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
    },
    update: () => {
      systems.forEach((c) => c.update())
    },
    render: () => {
      systems.forEach((c) => c.render())
    },
    shutdown: () => {
      systems.forEach((system) => system.shutdown && system.shutdown())
    },
  }
}
