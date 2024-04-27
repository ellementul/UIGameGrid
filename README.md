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

### Set Color Background
```js
box.setBgColor(r = 0, g = 0, b = 0, a = 1)
```

### Component
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
