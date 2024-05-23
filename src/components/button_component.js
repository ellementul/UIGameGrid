import { StateMachine, INIT_ACTION_NAME } from "@ellementul/state-machine"

const UP_STATE = "Up"
const DOWN_STATE = "Down"

const PRESS_ACTION = "Pressing"
const RELEASE_ACTION = "Releasing"

class ButtonComponent extends SubComponent {
    constructor (options) {
        super(options)

        this.state = new StateMachine
        this.state.addAction(INIT_ACTION_NAME, null, UP_STATE)
        this.state.addAction(PRESS_ACTION, UP_STATE, DOWN_STATE)
        this.state.addAction(RELEASE_ACTION, DOWN_STATE, UP_STATE)
    }
}

export { ButtonComponent }