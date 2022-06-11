import guify from 'guify'
import { createEntityByType } from '../entities'

export default (space, showGUI = false) => {
  let components = []
  const enable = () => {
    space.entities.forEach(
      (c) => (c.editable = space.mode === (c.type === 'wire' ? 2 : 1)),
    )
  }
  let gui
  if (showGUI) {
    const root = document.getElementById('gui')
    gui = new guify({ barMode: 'none', align: 'left', width: 300, root })
  }
  // editor should have modes:
  // disabled, nodes, wires
  // tab to switch between modes
  // when in node mode, can create/destroy/move nodes
  //   clicking and dragging on a node moves it around
  //   clicking on it toggles selection, hitting delete while selected deletes
  //   when deleting, should also remove any wires to this node
  //   should be able to box select and delete multiple eventually
  //   keyboard allows creation of different entities (1 for node, 2 for cell, 3 for switch, 4 for light)
  // when in wire mode, can create/destroy wires
  //   clicking on a wire selects it (need to change wires to have appropriate bounding box?)
  //   clicking on a node selects it, clicking a different node creates a wire and selects that node
  // clicking nothing deselects
  const addPanel = (opts) => showGUI && components.push(gui.Register(opts))
  const keydown = (e) => {
    if (e.key === 'p') {
      if (++space.mode > 2) {
        space.mode = 0
      }
      enable()
      return
    }
    if (space.mode === 0) return
    let entity
    if (e.key === '1') {
      entity = createEntityByType({ key: 'switch-1', x: 300, y: 300 })
      space.addEntity(entity)
    }
    // todo: add wire
    // todo: add node
    if (entity) {
      entity.editable = true
      entity.pointerDown = true
    }
  }

  document.addEventListener('keydown', keydown)

  const addEntity = (entity) => {
    entity.editable = space.mode > 0
    const coords = ['x', 'y']

    addPanel({
      type: 'folder',
      label: entity.key,
      open: false,
    })

    coords.forEach((key) => {
      if (typeof entity[key] !== 'number') return
      addPanel({
        type: 'range',
        label: key,
        property: key,
        min: 0,
        max: 1000,
        folder: entity.key,
        object: entity,
      })
    })

    entity.value &&
      addPanel({
        type: 'display',
        label: 'value',
        property: 'value',
        folder: entity.key,
        object: entity,
      })
  }

  return {
    update: (time) => {},
    render: (time) => {},
    addEntity,
    shutdown: () => {
      components.forEach((c) => gui.Remove(c))
      document.getElementById('gui').innerHTML = ''
      document.removeEventListener('keydown', keydown)
    },
  }
}
