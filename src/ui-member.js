import { MemberFactory } from "@ellementul/uee-core";
import { Application } from "pixi.js";
import { RootGrid } from "./root-grid.js";
import { AssetLoaderMember } from "./assetLoader/member.js";

export function UIMemberFactory () {
    const member = new MemberFactory
    member.makeRoom()
    member.addMember(new AssetLoaderMember)

    document.body.style.margin = "0px 0px 0px 0px"
    const app = new Application()
    app.init({ resizeTo: window, hello: true }).then(() => document.body.appendChild(app.canvas))
    member.pixiApp = app

    member.rootGrid = new RootGrid(member.pixiApp)
    app.stage.addChild(member.rootGrid)
    
    return member
}
