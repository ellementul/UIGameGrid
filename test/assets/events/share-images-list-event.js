import { Types, EventFactory } from "@ellementul/uee-core"

const type = Types.Object.Def({
    system: "Assets",
    action: "ShareList",
    type: "Image",
    images: Types.Any.Def()
}, true)

export const event = EventFactory(type)