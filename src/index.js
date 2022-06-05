import { init, initPointer, GameLoop } from 'kontra'
import createGameScreen from './screens/game'

init()
initPointer()

const screen = createGameScreen()

GameLoop({
  update: () => screen.space.update(),
  render: () => screen.space.render(),
}).start()
