import createSpace from '../systems/space'
import createEntitySystem from '../systems/entity'
import createEditorSystem from '../systems/editor'
import { createEntityByType } from '../entities'

export default () => {
  const space = createSpace()

  space.addSystem(createEntitySystem(space))
  space.addSystem(createEditorSystem(space))

  LEVEL.entities.forEach((component) => {
    const type = component.key.split('-')[0]
    space.addEntity(createEntityByType({ ...component, type }))
  })

  LEVEL.connections.forEach((connection) => {
    const [input = '', output = ''] = connection.split(':')
    space.addEntity(
      createEntityByType({
        key: `connection-${connection}`,
        type: 'connection',
        input: space.entities.find((e) => e.key === input),
        output: space.entities.find((e) => e.key === output),
      }),
    )
  })

  return { space, shutdown: () => space.shutdown() }
}

const LEVEL = {
  entities: [
    { key: 'node-1', x: 300, y: 200 },
    { key: 'node-3', x: 300, y: 600 },
    { key: 'battery-1', x: 300, y: 400 },
    { key: 'toggle-1', x: 700, y: 200 },
    { key: 'node-2', x: 1100, y: 200 },
    { key: 'node-4', x: 1100, y: 600 },
    { key: 'light-1', x: 1100, y: 400 },
  ],
  connections: [
    'battery-1:node-1',
    'node-1:toggle-1',
    'toggle-1:node-2',
    'node-2:light-1',
    'light-1:node-4',
    'node-4:node-3',
    'node-3:battery-1',
  ],
}
