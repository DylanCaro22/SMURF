export default class Binding {
  constructor(parent = null) {
    this.binding = new Map()
    this.parent = parent
  }

  getVariableValue(name) {
    if (this.checkVariableExists(name))
      return this.binding.get(name)
    else if (this.parent != null)
      return this.parent.getVariableValue(name)
    throw new Error(`Variable ${name} does not exist`)
  }


  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`${name} already exists`)
    this.binding.set(name, value)
  }


  updateVariable(name, value) {
    let update = this.getBinding(name)
    update.binding.set(name, value)
  }

  checkVariableExists(name) {
    if (!this.binding.has(name))
      return false
    return true
  }

  getBinding(name) {
    if (this.checkVariableExists(name))
      return this
    else if (this.parent != null)
      return this.parent.getBinding(name)
    throw new Error(`${name} does not exist`)
  }

  push() {
    let newBinding = new Binding(this)
    return newBinding
  }
  pop() {
    return this.parent
  }
}