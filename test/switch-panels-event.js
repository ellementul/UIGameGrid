import { Types, EventFactory } from "@ellementul/uee-core"

export const panelNames = ["Grid", "Panel", "Background", "Text", "OpenPickerImage"]

const type = Types.Object.Def({
    system: "UI",
    action: "SwitchPanels",
    state: Types.Any.Def(panelNames)
})

export default EventFactory(type)
