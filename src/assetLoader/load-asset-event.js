import { Types, EventFactory } from "@ellementul/uee-core"

const type = Types.Object.Def({
    system: "AssetsManagement",
    action: "load",
    source: "Host"
}, true)

export default EventFactory(type)
