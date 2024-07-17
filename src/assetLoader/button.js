import { Grid } from "../grid.js"
import uploadAssetEvent from "./upload-local-asset-event.js"

export class UploadAssetButton extends Grid {
    constructor(member) {
        super()

        this.eventMode = "static"

        this.assetName = "UserAsset"
        this.on('click', () => member.send(uploadAssetEvent, { assetName: this.assetName }))
    }
} 