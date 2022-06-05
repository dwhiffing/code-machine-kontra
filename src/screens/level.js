import createSpace from '../systems/space'
import createComponentSystem from '../systems/components'
import createConnectionSystem from '../systems/connections'
import createLevelEditorSystem from '../systems/editor'

export const createLevel = () => {
  const components = [
    { key: 'toggle-1', x: 600, y: 100, value: 0 },
    { key: 'node-1', x: 300, y: 100 },
    { key: 'node-2', x: 900, y: 100 },
    { key: 'node-3', x: 300, y: 300 },
    { key: 'node-4', x: 900, y: 300 },
    { key: 'light-1', x: 600, y: 300 },
  ]
  const connections = [
    'node-1:toggle-1',
    'toggle-1:node-2',
    'node-2:node-4',
    'node-4:light-1',
    'light-1:node-3',
    'node-3:node-1',
  ]

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
