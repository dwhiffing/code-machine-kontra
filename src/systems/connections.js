const createConnectionSystem = (space) => {
  const getConnections = () =>
    space.entities.filter((e) => e.type === 'connection')

  return {
    addEntity: (entity) => {},
    update: () => {
      getConnections().forEach((c) => c.update())
    },
    render: () => {
      getConnections().forEach((c) => c.render())
    },
    shutdown: () => {},
  }
}

export default createConnectionSystem
