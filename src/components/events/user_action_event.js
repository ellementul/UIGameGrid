import { Types } from "@ellementul/united-events-environment";

const type = Types.Object.Def({
    system: "UI",
    action: "UserAction",
    entity: "User",
    state: {
        event: Types.Any.Def("Moving", "Press", "Release"),
        elementPath: Types.Array.Def(Types.Key.Def(), 256),
        elementName:
    }
})

export default EventFactory(type)