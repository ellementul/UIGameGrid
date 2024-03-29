# UIGameGrid

## Description
Grid for postion of boxes.

Minimal side of grid is base side.

Base side can be 20 cells or 30 cells of lenght.

Each side of box has fixed distance from side of window.

Distance has to be Integer type.

Negative distance from opposite side.

Example:

    Left: 5 = 5 cells from left side of window for left side of box
  
    Left: -5 = 5 cells from right side of window for left side of box

With "Centred" option you can use only positive distance.

## Use
### Create grid
```js
const grid = new Grid() // Default 20 cells on base side
const grid = new Grid(30) // 30 cells on base side
```

### Top-left angle 4x4
```js
grid.createBox({
  name: "Name_your_Block", //Optional, setting as id of HTML element
  top: 0,
  left: 0,
  right: -4,
  bottom: -4
})
```
### Bottom-left angle 4x4
```js
grid.createBox({
  top: -4,
  left: 0,
  right: -4,
  bottom: 0
})
```

### Centered box 6x6
```js
grid.createBox({
  top: 3,
  left: 3,
  right: 3,
  bottom: 3,
  centred: true
})
```

### Get Top-left angle
```js
const box = grid.get("Name_your_Block")
```
