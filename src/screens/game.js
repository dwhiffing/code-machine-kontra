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

  LEVEL.wires.forEach((wire) => {
    const [input = '', output = ''] = wire.split(':')
    space.addEntity(
      createEntityByType({
        key: `wire-${wire}`,
        type: 'wire',
        input: space.entities.find((e) => e.key === input),
        output: space.entities.find((e) => e.key === output),
      }),
    )
  })

  return { space, shutdown: () => space.shutdown() }
}

const LEVEL = {
  entities: [
    { key: 'cell-1', value: 1, x: 300, y: 375 },
    { key: 'node-1', x: 300, y: 200 },
    { key: 'switch-1', x: 700, y: 200 },
    { key: 'node-2', x: 1100, y: 200 },
    { key: 'light-1', x: 1100, y: 400 },
    { key: 'node-4', x: 1100, y: 600 },
    { key: 'node-3', x: 300, y: 600 },
    { key: 'cell-2', value: -1, x: 300, y: 425 },
  ],
  wires: [
    'cell-1:node-1',
    'node-1:switch-1',
    'switch-1:node-2',
    'node-2:light-1',
    'light-1:node-4',
    'node-4:node-3',
    'node-3:cell-2',
  ],
}
