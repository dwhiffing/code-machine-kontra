import { track } from 'kontra'

export default (space) => {
  const graph = new Map()

  const addEntity = (entity) => {
    track(entity)
    space.entities = space.entities.sort((a, b) =>
      a.type === 'wire' ? -1 : b.type === 'wire' ? 1 : 0,
    )

    if (entity.type === 'wire') {
      graph.get(entity.input.key).push(entity.output.key)
      graph.get(entity.output.key).push(entity.input.key)
    } else {
      graph.set(entity.key, [])
    }
  }

  const checkPower = () => {
    const path =
      dfs(graph)?.map((k) => space.entities.find((e) => e.key === k)) || []
    const broken = path.some((node) => node.type === 'switch' && !node.value)

    path.forEach((node, i) => {
      if (node && node.type !== 'switch' && node.type !== 'cell') {
        node.value = broken ? 0 : 1
      }
      if (i > 0) {
        const connectionKey = `wire-${path[i - 1].key}:${node.key}`
        const wire = space.entities.find((e) => e.key === connectionKey)
        wire.value = broken ? 0 : 1
      }
    })
  }

  const update = () => {
    space.entities.forEach((c) => c.update())

    // TODO: only check power when state changes?
    checkPower()
  }

  const render = () => {
    space.entities.forEach((c) => {
      c.render()
      if (space.debug) drawDebug(c)
    })
  }

  const pointerUp = (e) => space.entities.forEach((c) => c?.onUp(e))
  const pointerMove = (e) => space.entities.forEach((c) => c?.onMove(e))
  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)

  return {
    addEntity,
    update,
    render,
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
  }
}

const drawDebug = (c) => {
  c.context.fillStyle = 'yellow'
  c.context.strokeStyle = 'red'
  c.context.beginPath()
  c.context.arc(c.x, c.y, 3, 0, 2 * Math.PI)
  c.context.fill()
  c.context.strokeRect(c.x - c.width / 2, c.y - c.height / 2, c.width, c.height)
}

const dfs = (
  graph,
  start = 'cell-1',
  target = 'cell-2',
  visited = new Set(),
) => {
  visited.add(start)

  const destinations = graph.get(start)
  for (const destination of destinations) {
    if (destination === target) {
      visited.add(destination)
      return [...visited]
    }

    if (!visited.has(destination)) {
      return dfs(graph, destination, target, visited)
    }
  }
}
