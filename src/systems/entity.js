import { track, untrack } from 'kontra'

export default (space) => {
  let graph = new Map()
  const resetWires = () => {
    graph = new Map()
    space.entities.forEach((e) => {
      if (e.type !== 'wire') {
        graph.set(e.key, [])
      }
    })
    space.entities.forEach((e) => {
      if (e.type === 'wire') {
        graph.get(e.input.key)?.push(e.output.key)
        graph.get(e.output.key)?.push(e.input.key)
      }
    })
  }
  const addEntity = (entity) => {
    track(entity)
    resetWires()
  }

  const removeEntity = (entity) => {
    untrack(entity)
    resetWires()
  }

  const checkPower = () => {
    // TODO: not dealing with forks properly
    space.entities
      .filter((e) => e.type !== 'switch')
      .forEach((e) => (e.value = 0))
    const path =
      dfs(graph)?.map((k) => space.entities.find((e) => e.key === k)) || []
    const broken = path.some((node) => node?.type === 'switch' && !node.value)
    path.forEach((node, i) => {
      if (node && node.type !== 'switch' && node.type !== 'cell') {
        node.value = broken ? 0 : 1
      }
      if (i > 0 && node && path[i - 1]) {
        const wireKey = `wire-${path[i - 1].key}:${node.key}`
        const wire = space.entities.find((e) => e.key === wireKey)
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
    if (!space.debug) return
    space.entities.forEach((c) => {
      if (space.mode === 1 && c.type !== 'wire') drawDebug(c)
      if (space.mode === 2 && c.type === 'wire') drawDebug(c)
    })
  }

  const pointerMove = (e) => space.entities.forEach((c) => c?.onMove(e))
  document.addEventListener('pointermove', pointerMove)

  return {
    addEntity,
    removeEntity,
    update,
    render,
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
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
