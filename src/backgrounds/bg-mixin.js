import { DEPRECATED_SCALE_MODES, Texture } from "pixi.js"
import { SpriteBg } from "./sprite-background.js"
import { DebugBg } from "./debug-background.js"

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

