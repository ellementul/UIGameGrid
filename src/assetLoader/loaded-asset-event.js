import { Types, EventFactory } from "@ellementul/uee-core"

const type = Types.Object.Def({
    system: "AssetsManagement",
    action: "loaded",
    assetName: Types.Key.Def()
}, true)

export default EventFactory(type)
