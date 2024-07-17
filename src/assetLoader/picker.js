export const ImageAssetType = "image/*"

export function showOpenAssetPicker(accept) {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept || ImageAssetType

        input.addEventListener("change", () => {
            resolve(async () => {
                new Promise((resolve) => {
                    resolve(input.files[0]);
                })
            })
        })

        input.click()
    });
}