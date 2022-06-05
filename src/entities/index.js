import toggle from './toggle'
import light from './light'
import node from './node'
import connection from './connection'

export { default as createEntityFactory } from './base'

const entities = { toggle, node, light, connection }
export const createEntityByType = (opts) => entities[opts.type](opts)
