# UIGameGrid

## Description
Grid for postion of box.
Minimal side of grid is base side.
Base side can be 20 cells or 30 cells of lenght
Each side of box has fixed distance from side of window.
Distance has to be Integer type
Negative distance from opposite side
Example:
  Left: 5 = 5 cells from left side of window for left side of box
  Left: -5 = 5 cells from right side of window for left side of box
## Use
### Top-left angle 4x4
```js
window.Grid.createBox({
  top: 0
  left: 0
  right: -4
  bottom: -4
})
```
### Bottom-left angle 4x4
```js
window.Grid.createBox({
  top: -4
  left: 0
  right: -4
  bottom: 0
})
```
### Fixed and strench
If you use only negative distances, box will be stretched proportionally to the screen in diffrent resolutions
If you use only positive distances, box will not change size in diffrent resolutions
