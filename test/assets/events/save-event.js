import { Types, EventFactory } from "@ellementul/uee-core"

export const MIME_TYPES = { image: "images/*" }

const type = Types.Object.Def({
    system: "Files",
    action: "Save",
    type: Types.Any.Def(Object.values(MIME_TYPES)),
    fileName: Types.Any.Def(),
    data: Types.Any.Def()
})

export const event = EventFactory(type)
