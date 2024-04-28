class AbstractMethodError extends Error {
    constructor(methodName) {
        super(`This "${methodName}" method is abstract! It has to define in your child's class!`)
    }
}

const ABSTRACT_METHOD_LIST = [
    "setBgColor",
    "setWidth",
    "setHeight",
    "setTop",
    "setLeft",
    "hidden",
    "show"
]

const createAbstractMethod = (context, methodName) => {
    const abstractMethod = function(){ throw new AbstractMethodError(methodName) }
    return abstractMethod.bind(context)
}

class AbstractComponent {}

ABSTRACT_METHOD_LIST.forEach(methodName => {
    AbstractComponent.prototype[methodName] = createAbstractMethod(AbstractComponent.prototype, methodName) 
})


export { AbstractComponent }