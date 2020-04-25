function bool(val)
{
  return val ? 1:0
}
const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
  "==": (l, r) => bool(l == r),
  "!=": (l, r) => bool(l != r),
  ">=": (l, r) => bool(l >= r),
  ">": (l, r) => bool(l > r),
  "<=": (l, r) => bool(l <= r),
  "<": (l, r) => bool(l < r),
}
export default class Interpreter {
  constructor(target, printFunction) {
    this.target = target
    this.printFunction = printFunction
    this.binding = new Map()
  }

  visit() {
    return this.target.accept(this)
  }

  BinOp(node) {
    let l = node.left.accept(this)
    let r = node.right.accept(this)
    return  Operations[node.op](l, r)
  }

  IntegerValue(node) {
    return node.value
  }

  ifStatement(node)
  {
    let expr = node.cond.accept(this);
    let code = node.ifPart
    let rest = node.elsePart
    if(expr == 1){
        return code.accept(this);
    }else{
        return rest.accept(this);
    }
  }
  Statements(node)
  {
    let temp = node.statements
    let num = 0
    for (let statement of temp) {
        num = statement.accept(this)
    }
    return num
  }
  visitNull(node)
  {
    return null
  }
  FunctionDef(node)
  {
    return node.list
  }
  FunctionCall(node)
  {
    let name = node.params.accept(this)
    return name.accept(this)
  }
  Assignment(node)
  {
    let variable = node.name.accept(this);
    let expr = node.expr.accept(this);
    if(this.binding.has(variable)){
        this.setVariable(variable, expr);
    }
    return expr;
  }
  VariableDecl(node)
  {
    let variable = node.name.accept(this);
    let expr = node.expr.accept(this);
    if(this.binding.has(variable)){
        throw new Error(`already defined variable ${variable}`)
    }
    else
    {
      this.setVariable(variable, expr);
    }
    return expr;
  }
  VariableName(node)
  {
    return node.name
  }
  setVariable(name, value)
  {
    this.binding.set(name,value)
  }
  VariableValue(node)
  {
    return this.getVariable(node.name)
  }
  getVariable(name)
  {
    if(this.binding.has(name))
      return this.binding.get(name)
  }
}