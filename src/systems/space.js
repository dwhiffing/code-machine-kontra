import toggle from '../components/toggle'
import node from '../components/node'
import connection from '../components/connection'
const componentFactories = { toggle, node }

const createSpace = () => {
  const systems = []
  const entities = []

  const createEntity = function (type = '', opts) {
    let entity
    const _type = opts.type || type
    const id =
      entities.filter((e) => e.key?.match(new RegExp(_type))).length + 1
    const key = opts.key || `${_type}-${id}`
    if (type === 'component') {
      entity = componentFactories[opts.type]({ key, ...opts })
    } else if (type === 'connection') {
      const [input = '', output = ''] = opts.connection.split(':')
      entity = connection({
        key,
        ...opts,
        input: entities.find((e) => e.key === input),
        output: entities.find((e) => e.key === output),
      })
    }
    if (entity) {
      entity.type = type
      this.addEntity(entity)
      return entity
    }
  }

  return {
    createEntity,
    entities,
    addSystem: function (system) {
      systems.push(system)
    },
    addEntity: function (entity) {
      entities.push(entity)
      systems.forEach((system) => {
        system.addEntity(entity)
      })
    },
    update: function () {
      systems.forEach((c) => c.update())
    },
    render: function () {
      systems.forEach((c) => c.render())
    },
    shutdown: function () {
      systems.forEach((system) => system.shutdown && system.shutdown())
    },
  }
}

export default createSpace
