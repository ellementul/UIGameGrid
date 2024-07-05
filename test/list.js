import { Panel } from "../src/index.js"

export function ListPanels(listPanels) {
    const mainPanel = new Panel()
    mainPanel.posizes.top = -1
    mainPanel.posizes.bottom = 0

    mainPanel.panels = listPanels
    for (const [namePanel, panel] of mainPanel.panels)
        mainPanel.addChild(panel)

    mainPanel.hideAll = () => {
        for (const [namePanel, panel] of mainPanel.panels) {
            panel.visible = false
        }
    }

    mainPanel.showPanel = (namePanel) => {
        if(mainPanel.panels.has(namePanel))
            mainPanel.panels.get(namePanel).visible = true
    }

    // setTimeout(mainPanel.hideAll, 0)

    return mainPanel
}