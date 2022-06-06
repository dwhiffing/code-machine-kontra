import toggle from './toggle'
import light from './light'
import node from './node'
import connection from './connection'
import cell from './cell'

const entities = { toggle, node, light, connection, cell, connection }
export const createEntityByType = (opts) => entities[opts.type]?.(opts)
