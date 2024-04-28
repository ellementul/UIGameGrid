# UIGameGrid
UI tiling for games


## Grid
Grid is root for all components
Grid setup sizes of cells
Components can use cells as coordinates
It make to create components siply for diffrents sizes and orintations screens

Minimal side of grid is base side.
The base sice is always minimal side.

Base side can be 20 cells or 30 cells of lenght.

if grid is resized then cells changes size and gris can chandge base side on other side

### Create Grid
```js
const grid = new Grid() // Default 20 cells on base side
const grid = new Grid(30) // 30 cells on base side
```

### Create Component by Grid
```js
const rootComponent = grid.createComponent("Name_your_Component")
```

### Get Component by Name
```js
const box = grid.get("Name_your_Component")
```


## Component
All components is derived from SubComponent class (exclude base Component class)
The base component class for root component and all render methods
All components calls render methods from Component class
If we want change render engine then we need rewrite only Component class

### Types Components
+ SubComponent - base class for custom components without Grid
+ CellComponent - base class for little components
+ GridComponent - base class for big custom components with Grid

## TODO
Make button for DebugGrid
Make slider for sitting subdivide subGrid

Нужно разделить компонет на два класса, один внутри сетки, другой обертка поверх первого, уже внутри участника
  Первый содержит:
    Методы стилей
    Метод создания подкомпонета с автоматическим расширением его базовым классом
    Методы позиционирования подкомпонета
  Обертка содержит:
    Методы работы с событиями
Компонет не может быть отдельным Участником, это дорого и сложно
Но компонет должен иметь возможность подписываться на события, и посылать события
Эти фукнции ему может предоставить учатник внутри которого содержится компонент
Участник так же проксирует все события, и отфильтровывает те что не дожный выходить наружу Участника
  Фильтрация происходит по полю события access
  Кроме значений local и public добавляются значениt "member", которое не дает событию покинуть Участника
  Дефолтное события компонета по умолчанию на уровне всей системы считаются одним событием:
    содержит ограчение на доступ "member", нужно вызывать специальный метод отсылки, чтобы это было не так
      send
      sendLocalMembers
      sendAllMemebers
    все первичные свойства события уже проставлены, ожидается только обьект "state"
    в "state" хранится:
      Имя событие на уровне UI
      Параматры события если необходимо

Компонент подписывается на события и отписывается от них через Участника
Компонент имеет метод который отписывает его от всех событий(удаляет все его коллбэки из списка Участника)
Компонент вызывает отписку от всех событий перед каждым рендерингом
Компонет так де пред реджеригом вызывает отписку от всех событий для всех подкомпонетов
Компонент для создания подкомпонета принимает только его классс
Класс компонета диктует на какие события он подписан, его размеры, его рацветку и его подкомпоненты
Класс компонета не решает свою позицию и видимость, это задает родительский компонет
Перед созданием компонета его класс всегда расширяется базовым классвом компонета 

### Set Color Background
```js
box.setBgColor(r = 0, g = 0, b = 0, a = 1)
```

## Panels
Panel can't be big then base side grid by width or height 
#### Bottom
#### Top
#### Left
#### Right