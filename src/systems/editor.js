import { onPointer } from 'kontra'
import { createEntityByType } from '../entities'

export default (space) => {
  let components = []
  const enable = () => {
    space.entities.forEach((c) => {
      c.editable = space.mode === (c.type === 'wire' ? 2 : 1)
      c.wireable = space.mode === 2
      c.selected = false
      c.interactable = space.mode === 0
    })
  }

  onPointer('up', function (e, object) {
    if (space.mode !== 0) {
      // wiring mode
      if (object && space.mode === 2 && object.type !== 'wire') {
        const selected = space.entities.find((o) => o.selected)

        // select input node for wire
        if (!selected) {
          object.selected = !object.selected
          return
        }

        // select output node for wire and created
        space.addEntity(
          createEntityByType({
            key: `wire-${selected.key}:${object.key}`,
            type: 'wire',
            input: selected,
            output: object,
          }),
        )
      }

      // deselect all
      space.entities.forEach((c) => {
        if (object !== c) c.selected = false
      })
    }
  })

  const keydown = (e) => {
    // toggle mode: normal, edit, wire
    if (e.key === 'p') {
      if (++space.mode > 2) {
        space.mode = 0
      }
      enable()
      return
    }

    // delete selected
    if (e.key === 'Backspace') {
      const selected = space.entities.filter((c) => c.selected)
      selected.forEach((e) => {
        const connectedWires = space.entities.filter((c) =>
          c.key.match(new RegExp(`${e.key}`)),
        )
        connectedWires.forEach((t) => space.removeEntity(t))
        space.removeEntity(e)
      })
    }

    if (space.mode === 0) return

    // create nodes
    let entity
    let _type
    if (e.key === '1') {
      _type = 'node'
    }
    if (e.key === '2') {
      _type = 'switch'
    }
    if (e.key === '3') {
      _type = 'light'
    }
    if (_type) {
      const sameType = space.entities.filter((e) => e.type === _type)
      const last = sameType[sameType.length - 1]
      const key = last ? +last.key.split('-')[1] + 1 : 0
      entity = createEntityByType({
        key: `${_type}-${key}`,
        type: _type,
        x: 0,
        y: 0,
      })
    }
    if (entity) {
      space.addEntity(entity)
      entity.editable = true
      entity.interactable = false
      entity.wireable = false
      entity.placing = true
      entity.onDown({ offsetX: 0, offsetY: 0 })
      entity.value = 0
    }
  }

  document.addEventListener('keydown', keydown)

  return {
    update: (time) => {},
    render: (time) => {},
    removeEntity: (entity) => {},
    addEntity: (entity) => (entity.editable = space.mode > 0),
    shutdown: () => {
      components.forEach((c) => gui.Remove(c))
      document.getElementById('gui').innerHTML = ''
      document.removeEventListener('keydown', keydown)
    },
  }
}
