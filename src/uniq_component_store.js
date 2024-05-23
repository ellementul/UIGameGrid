class ComponentsStore extends Set {
    set(name, component) {
        if(this.has(name))
            throw new Error(`This uniq name "${name}" is defined for component already!`)

        super.set(name, component)
    }
}
export { ComponentsStore }