import { MemberFactory } from "@ellementul/uee-core"
import uploadAssetEvent from "./upload-asset-event.js"
import { showOpenAssetPicker } from "./picker.js"

export function AssetLoaderMember () {
    const member = new MemberFactory
    
    member.onConnectRoom = () => {
        member.subscribe(uploadAssetEvent, () => {
            showOpenAssetPicker()
        })
    }
    
    return member
}