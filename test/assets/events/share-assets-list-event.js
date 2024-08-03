import { Types, EventFactory } from "@ellementul/uee-core"

export const ASSETS_TYPES = { image: "Image" }

const type = Types.Object.Def({
    system: "Assets",
    action: "ShareList",
    type: Types.Any.Def(Object.values(ASSETS_TYPES))
}, true)

export const event = EventFactory(type)