import { Container, Point, Rectangle, Sprite, Texture } from "pixi.js"

export class TileMap extends Container {
    constructor() {
        super()
        this.sortableChildren = true

        this.isTilling = true
        this.tileLines = new Map
        this.tileSizes = new Point(1,1)
    }

    set tileSize({ x, y }) {
        this.tileSize.set(x, y)
        this.update()
    }

    set({ x, y }, texture) {
        if(!this.tileLines.has(y)) {
            const tileLine = new TileLine
            tileLine.tileSize = this.tileSizes.x
            tileLine.position.y = y * this.tileSizes.y

            this.tileLines.set(y, tileLine)

            this.addChild(tileLine)
            tileLine.zIndex = y
        }

        const tile = this.tileLines.get(y).set(x, texture)
        tile.tilePosition.y = y

        return tile
    }

    delete(x, y) {
        if(this.tileLines.has(y))
            this.tileLines.get(y).delete(x)
    }

    clear() {
        this.forEach((tileLine, y) => {
            tileLine.removeFromParent()
            tileLine.clear()
        })
    }

    update() {
        this.forEach((tileLine, y) => {
            tileLine.position.y = y * this.tileSizes.y
            tileLine.tileSize = this.tileSizes.x
            tileLine.update()
        })
    }

    forEach(callback) {
        for (const [y, tileLine] of this.tileLines) {
            callback(tileLine, y)
        } 
    }

    sliceAtlas(source, sizes) {
        this.tileSizes.set(source.pixelWidth / sizes.x, source.pixelHeight / sizes.y)

        this.atlas = {
            source,
            frames: [],
        }

        for (let y = 0; y < sizes.y; y++) {
            this.atlas.frames[y] ||= []

            for (let x = 0; x < sizes.x; x++) { 
                this.atlas.frames[y][x] = new Texture({
                    source,
                    frame: new Rectangle(x*this.tileSizes.x, y*this.tileSizes.y, this.tileSizes.x, this.tileSizes.y)
                })
            }
        }
    }
}

class TileLine extends Container {
    constructor() {
        super()

        this.sortableChildren = true
        this.tiles = new Map

        this.tileSize = 0
    }

    set(x, texture) {
        if(!this.tiles.has(x)) {
            const tile = new Tile
            tile.tilePosition.x = x
            this.tiles.set(x, tile)
            this.addChild(tile)
            tile.zIndex = x
        }

        if(this.tileSize === 0)
            this.tileSize = texture.width

        const tile = this.tiles.get(x)
        tile.texture = texture
        tile.position.x = tile.tilePosition.x * this.tileSize

        return tile
    }

    delete(x) {
        this.tiles.get(x).removeFromParent()
        this.tiles.delete(x)
    }

    update() {
        this.forEach((tile, x) => {
            tile.position.x = x * this.tileSize
        })
    }

    clear() {
        this.forEach((tile, x) => {
            tile.removeFromParent()
            this.tiles.delete(x)
        })
    }

    forEach(callback) {
        for (const [x, tile] of this.tiles) {
            callback(tile, x)
        } 
    }
}

class Tile extends Sprite {
    constructor(options) {
        super(options)

        this.tilePosition = new Point
    }
}