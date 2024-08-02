import { Types, EventFactory } from "@ellementul/uee-core"

export const ASSETS_TYPES = { image: "Image" }

const type = Types.Object.Def({
    system: "Assets",
    state: "Added",
    asset: {
        type: Types.Any.Def(Object.values(ASSETS_TYPES)),
        name: Types.Any.Def(),
        data: Types.Any.Def()
    }
})

export const event = EventFactory(type, 1)