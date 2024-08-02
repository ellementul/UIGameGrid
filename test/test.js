import { uiMember } from "../src/index.js"

import { SwitchPanel } from "./switch-panel.js"
import { DemoBackground, DemoGrid, DemoPanel, DemoText } from "./demo-panels.js"
import { ListPanels } from "./list.js"

import switchEvent from "./switch-panels-event.js"
import { Assets } from "pixi.js"
import { DemoAssets } from "./assets/demo-panel.js"
import { LocalLoaderMemberFactory } from "@ellementul/uee-local-loader"
import { AssetsManagerMember } from "./assets/member.js"

uiMember.debug(true)

const loaderMember = new LocalLoaderMemberFactory
const assetMember = new AssetsManagerMember
uiMember.addMember(loaderMember)
uiMember.addMember(assetMember)

await Assets.load('Pixel.ttf')
await Assets.load({ alias: "bgButton", src: 'background3x3.png' })
await Assets.load({ alias: "bgInput", src: 'bgInput3x3.png'})


const panels = new Map([
    ["Grid", new DemoGrid],
    ["Panel", new DemoPanel],
    ["Background", new DemoBackground],
    ["Text", new DemoText],
    ["Assets", new DemoAssets]
])
const listPanels = new ListPanels(panels)

setTimeout(listPanels.hideAll, 0)

uiMember.subscribe(switchEvent, ({ state: namePanel }) => {
    listPanels.hideAll()
    listPanels.showPanel(namePanel)
})

uiMember.rootGrid.addChild(listPanels)
uiMember.rootGrid.addChild(new SwitchPanel([...panels.keys()]))
