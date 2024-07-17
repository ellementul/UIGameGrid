import { Container, DEPRECATED_SCALE_MODES, Graphics, Point, Rectangle, Sprite, Texture } from "pixi.js"
import { TileMap } from "./tilemap.js"
import { SpriteBg } from "./sprite-background.js"
import { DebugBg } from "./debug-background.js"

const ONE_TILES_TYPE = "OneTilesType"
const TWO_TILES_TYPE = "OneTilesType"  
const NINE_TILES_TYPE = "NineTilesType" 

export function SetBgMixin(object) {
    object = Object.assign(object, {
        setBg(bg) {
            if(this.background)
                this.background.removeFromParent()

            if(bg) {
                if(bg.isBackground)
                    this.background = bg

                if(bg.isTexture) {
                    bg.source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST
                    this.background = new SpriteBg(bg)
                }
            }
            else {
                this.background = new SpriteBg(Texture.EMPTY)
            }

            this.addChildAt(this.background, 0)
        },

        debug(switchOn) {
            if(!switchOn && this.debugBg) {
                this.debugBg.removeFromParent()
                this.debugBg = null
            }
    
            if(switchOn && !this.debugBg) {
                this.debugBg = new DebugBg
                this.addChildAt(this.debugBg, 1)
            }
        }
    })

    object.setBg()

    return object
}

class NineTillingBg extends TileMap {
    constructor(texture) {
        super()

        const source = texture.source
        source.scaleMode = DEPRECATED_SCALE_MODES.NEAREST
        this.sliceAtlas(source, new Point(3, 3))
        
        this.tillingSizes = new Point(1, 1)
    }

    updateSizes() {
        this.clear()

        for (let y = 0; y < this.tillingSizes.y; y++) {
            for (let x = 0; x < this.tillingSizes.x; x++) {
                const frame = new Point(this.calcBound(x, this.tillingSizes.x), this.calcBound(y, this.tillingSizes.y))
                this.set({x, y}, this.atlas.frames[frame.y][frame.x])
            }
        }
    }

    calcBound(coord, limit) {
        if(coord == 0)
            return 0
    
        if(coord + 1 == limit)
            return 2
    
        return 1
    }
}

