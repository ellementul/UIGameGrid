import { Graphics } from "pixi.js"

export class DebugBg extends Graphics {
    constructor() {
        super(...arguments)

        this.isTilling = true
        this.isBackground = true

        this.alpha = 0.5
        this.scale.set(1, 1)

        this.on('added', () => this.updateSizes())
    }

    updateSizes() {
        if(!this.parent || !this.parent.isTilling)
            return

        this.clear()

        const tileSize = this.parent.tileSize
        const tillingSizes = this.parent.tillingSizes

        for (let y = 0; y < tillingSizes.y; y++) {
            for (let x = 0; x < tillingSizes.x; x++) {

                const colors = ['#ffca02', '#070602']
                const index = (x + y) % 2

                this.rect(tileSize*x, tileSize*y, tileSize, tileSize)
                    .fill(colors[index])
            }
        }

        this.rect(0, 0, tillingSizes.x * tileSize, tillingSizes.y * tileSize)
            .stroke({ color: 'yellow' })

    }
}