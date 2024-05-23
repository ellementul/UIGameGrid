import { Types } from "@ellementul/united-events-environment";

const type = Types.Object.Def({
    system: "UI",
    action: "ChangeState",
    entity: "UIElement"
})

export default EventFactory(type)