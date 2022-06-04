import { init, initPointer, GameLoop } from 'kontra'
import { createLevel } from './screens/level'

init()
initPointer()

let screen = createLevel()

GameLoop({
  update: () => screen && screen.space.update(),
  render: () => screen && screen.space.render(),
}).start()
