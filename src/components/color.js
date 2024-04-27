export function validationColor(color) {
    return CSS.supports('color', color)
}
export function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16)
}