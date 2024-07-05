import { Types, EventFactory } from "@ellementul/uee-core"

const type = Types.Object.Def({
    system: "UI",
    action: "SwitchPanels",
    state: Types.Any.Def("Grid", "Panel")
})

export default EventFactory(type)
