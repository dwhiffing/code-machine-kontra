import toggle from './toggle'
import light from './light'
import node from './node'
import connection from './connection'
import battery from './battery'

const entities = { toggle, node, light, connection, battery, connection }
export const createEntityByType = (opts) => entities[opts.type]?.(opts)
