import { Types, EventFactory } from "@ellementul/uee-core"

const ASSET_IMAGE_TYPE = "images/*"
const ASSET_AUDIO_TYPE = "audio/*"
const ASSET_VIDEO_TYPE = "video/*"

const type = Types.Object.Def({
    system: "AssetsManagement",
    action: "load",
    type: Types.Any.Def(ASSET_IMAGE_TYPE, ASSET_AUDIO_TYPE, ASSET_VIDEO_TYPE),
    source: "User",
    assetName: Types.Key.Def()
}, true)

export default EventFactory(type)
