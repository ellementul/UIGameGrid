import { Types, EventFactory } from "@ellementul/uee-core"

const type = Types.Object.Def({
    system: "UICache",
    state: "Loaded",
    name: Types.Any.Def()
})

export const event = EventFactory(type, 1)