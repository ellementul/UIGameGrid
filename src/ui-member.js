import { MemberFactory } from "@ellementul/uee-core";
import { Application } from "pixi.js";

export function UIMemberFactory () {
    const member = new MemberFactory
    member.makeRoom()

    document.body.style.margin = "0px 0px 0px 0px"
    const app = new Application()
    app.init({ resizeTo: window, hello: true }).then(() => document.body.appendChild(app.canvas))
    member.pixiApp = app

    return member
}
