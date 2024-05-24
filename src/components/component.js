class AbstractMethodError extends Error {
    constructor(methodName) {
        super(`This "${methodName}" method is abstract! It has to define in your child's class!`)
    }
}

const ABSTRACT_METHOD_LIST = [
    "destructor",
    "setBgColor",
    "getBgColor",
    "setWidth",
    "setHeight",
    "setTop",
    "setLeft",
    "hidden",
    "show",
    //Events
    "onPointerDown",
    "onPointerUp",
    "onPointerMove"
]

const createAbstractMethod = (context, methodName) => {
    const abstractMethod = function(){ throw new AbstractMethodError(methodName) }
    return abstractMethod.bind(context)
}

class Component {}

ABSTRACT_METHOD_LIST.forEach(methodName => {
    Component.prototype[methodName] = createAbstractMethod(Component.prototype, methodName)
})

const componentType = "Symbol_6daac273-9bea-4f9e-9af2-90326225efa3"
Component.prototype.componentType = componentType
Component.is = component => component && typeof component === "object" && component.componentType === componentType


export { Component }