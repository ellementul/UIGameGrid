import { Types, EventFactory } from "@ellementul/uee-core"

const type = Types.Object.Def({
    system: "Pixijs",
    action: "UploadAsset",
    state: "Image"
}, true)

export default EventFactory(type)
