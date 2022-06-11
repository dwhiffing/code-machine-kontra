import _switch from './switch'
import light from './light'
import node from './node'
import wire from './wire'
import cell from './cell'

const entities = { switch: _switch, node, light, wire, cell, wire }
export const createEntityByType = (opts) => entities[opts.type]?.(opts)
