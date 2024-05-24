import { SubComponent } from "./sub_component"

class CameraComponent extends SubComponent {
    constructor (options) {
        super(options)

        this.canvas = new SubComponent({ parent: this })
        this.addSubComponent = (name, component) => this.canvas.addSubComponent(name, component)

        this.onPointerDown(() => console.log("PointerDown!"))
    }

    //TODO Scrolling DraOnDrop

    setCanvasWidth(width) {
        this.canvas.setWidth(width)
    }

    setCanvasHeight(height) {
        this.canvas.setHeight(height)
    }

    clear() {
        super.clear()

        this.addSubComponent = super.addSubComponent
        this.canvas = new SubComponent({ parent: this })
        this.addSubComponent = (name, component) => this.canvas.addSubComponent(name, component)
    }
}

export { CameraComponent }