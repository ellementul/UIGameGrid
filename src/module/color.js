export function validationColor(color) {
    CSS.supports('color', color)
}
export function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16)
}