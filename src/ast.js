export class BinOp {
  constructor(l, op, r) {
    this.left  = l
    this.op    = op
    this.right = r
  }
  accept(visitor) {
    return visitor.BinOp(this)
  }
}

export class IntegerValue {
  constructor(value) {
    this.value = value
  }

  accept(visitor) {
    return visitor.IntegerValue(this)
  }
}


export class ifStatement {
  constructor(cond, ifPart, elsePart) {
    this.cond = cond;
    this.ifPart = ifPart
    this.elsePart = elsePart
  }
  accept(visitor) {
    return visitor.ifStatement(this)
  }
}

export class nullStatements {
  constructor() {}
  accept(visitor){
      return visitor.nullStatements(this)
  }
}

export class variablename {
  constructor(name) {
      this.name = name
  }

  accept(visitor) {
      return visitor.VariableName(this)
  }
}

export class variablevalue {
  constructor(name) {
      this.name = name
  }

  accept(visitor) {
      return visitor.VariableValue(this)
  }
}

export class Assignment {
  constructor(name, expr) {
      this.name = name
      this.expr = expr
  }

  accept(visitor) {
      return visitor.Assignment(this)
  }
}
export class VariableDecl {
  constructor(name, expr) {
      this.name = name
      this.expr = expr
  }

  accept(visitor) {
      return visitor.VariableDecl(this)
  }
}
export class funcDef {
  constructor(params, list){
      this.params = params
      this.list = list
  }

  accept(visitor){
      return visitor.FunctionDef(this)
  }
}

export class FunctionCall {
  constructor(params, list){
      this.params = params
      this.list = list
  }

  accept(visitor){
      return visitor.FunctionCall(this)
  }
}

export class Statements {
  constructor(statements){
      this.statements = statements
  }

  accept(visitor){
      return visitor.Statements(this)
  }
}