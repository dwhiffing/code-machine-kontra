import guify from 'guify'
import createToggle from '../entities/toggle'

const create = (space, showGUI = false) => {
  let components = []
  let enabled = !!space.debug
  const enable = () => space.entities.forEach((c) => (c.draggable = enabled))
  let gui
  if (showGUI) {
    const root = document.getElementById('gui')
    gui = new guify({ barMode: 'none', align: 'left', width: 300, root })
  }
  const addPanel = (opts) => showGUI && components.push(gui.Register(opts))
  const keydown = (e) => {
    if (e.key === 'p') {
      enabled = !enabled
      enable()
      return
    }
    if (!enabled) return
    let entity
    if (e.key === '1') {
      entity = createToggle({ key: 'toggle-1', x: 300, y: 300 })
      space.addEntity(entity)
    }
    // todo: add connection
    // todo: add node
    if (entity) {
      entity.draggable = true
      entity.pointerDown = true
    }
  }

  document.addEventListener('keydown', keydown)

  const addEntity = (entity) => {
    entity.draggable = enabled
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

export default create
