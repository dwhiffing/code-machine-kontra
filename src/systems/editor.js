import guify from 'guify'

// press button to toggle edit mode
// when in edit mode, clicking selects an entity
// draggning moves it around
// when selected, can see all properties of entity in menu, including connections
// can modify values and connections
// once finished, can output updated values to console
const createLevelEditorSystem = (space, x, y) => {
  let components = []
  let enabled = false
  const gui = new guify({
    barMode: 'none',
    align: 'left',
    width: 300,
    root: document.getElementById('gui'),
  })
  const addPanel = (opts) => components.push(gui.Register(opts))
  const keydown = (e) => {
    if (e.key === 'p') {
      enabled = !enabled
      space.entities.forEach((c) => (c.draggable = enabled))
      return
    }
    if (!enabled) return
    let entity
    if (e.key === '1') {
      entity = space.createEntity('component', {
        type: 'toggle',
        x: 300,
        y: 300,
      })
    }
    if (e.key === '0') {
      const connectionString = window.prompt(
        'Enter new connection',
        'knob-1.value:gridScreen-1.x',
      )
      space.addEntity(connectionString)
    }
    if (entity) {
      entity.draggable = true
      entity.pointerDown = true
    }
  }

  document.addEventListener('keydown', keydown)

  return {
    addEntity: (entity) => {
      if (entity.type === 'component') {
        const minMax = ['min', 'max']
        const coords = ['x', 'y']
        const screens = ['active', 'goal']

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

        minMax.forEach((key) => {
          if (typeof entity[key] !== 'number') return
          addPanel({
            type: 'range',
            label: key,
            property: key,
            folder: entity.key,
            object: entity,
          })
        })

        screens.forEach((screenKey) => {
          if (!entity[screenKey]) return
          Object.keys(entity[screenKey]).forEach((key) => {
            addPanel({
              type: key.match(/^x$|^y$|amplitude|wavelength/)
                ? 'range'
                : key.match(/^color$/)
                ? 'color'
                : 'display',
              label: `${screenKey}-${key}`,
              property: key,
              folder: entity.key,
              object: entity[screenKey],
            })
          })
        })
      } else if (entity.type === 'connection') {
        const { input, output } = entity
        addPanel({
          type: 'folder',
          label: `${input.key}:${output.key}`,
          open: false,
        })
        // addPanel({
        //   type: 'text',
        //   folder: `${input.key}-${output}`,
        //   label: 'input',
        //   object: entity,
        //   property: 'input',
        // })
        // addPanel({
        //   type: 'text',
        //   folder: `${input.key}-${output}`,
        //   label: 'output',
        //   object: entity,
        //   property: 'output',
        // })
      }
    },
    update: (time) => {},
    render: (time) => {},
    shutdown: () => {
      components.forEach((c) => gui.Remove(c))
      document.getElementById('gui').innerHTML = ''
      document.removeEventListener('keydown', keydown)
    },
  }
}

export default createLevelEditorSystem
