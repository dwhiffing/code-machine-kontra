import createSpace from '../systems/space'
import createComponentSystem from '../systems/components'
import createConnectionSystem from '../systems/connections'
import createLevelEditorSystem from '../systems/editor'

export const createLevel = () => {
  const components = [
    { key: 'toggle-1', x: 587, y: 557, value: 0, max: 50 },
    { key: 'toggle-2', x: 750, y: 558, value: 0, max: 50 },
  ]
  const connections = ['toggle-1.value:toggle-2.value']

  const space = createSpace()
  space.index = 0

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space)
  space.addSystem(connectionSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

  components.forEach((component) => {
    const type = component.key.split('-')[0]
    space.createEntity('component', { ...component, type })
  })

  connections.forEach((connection) => {
    space.createEntity('connection', { connection })
  })

  return {
    space,
    shutdown: () => space.shutdown(),
  }
}
