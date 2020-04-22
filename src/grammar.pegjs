{
  const AST = options.AST

  function rollupBinOp(head, rest) {
    return rest.reduce(
      (result, [op, right]) => new AST.BinOp(result, op, right),
      head
    )
  }
}

start
  = code

identifier       
   = id:([a-z][a-zA-Z_0-9]*)
    { return text() }

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = _ s:statement+ _
  {return new AST.Statements(s)}

statement
  = "let" _ d:variable_declaration
  {return d}
  / assignment
  / expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = v:variablename "=" e:expr
    {return new AST.Assignment(v,e)}
  / v:variablename
    {return new AST.Assignment(v, new AST.IntegerValue(0))}

variablevalue             // as rvalue
  = _ id:identifier _
      {return new AST.variablevalue(id)}

variablename              // as lvalue
  = _ id:identifier _
      {return new AST.variablename(id)}

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = condition:expr ifPart:brace_block "else" elsePart:brace_block
    {return new AST.ifStatement(condition, ifPart, elsePart)}
  / condition:expr ifPart:brace_block
    {return new AST.ifStatement(condition, ifPart, [])}

//////////////////////////////// assignment /////////////////////////////

assignment
  = name:variablename _ "=" _ expr:expr
    {return new AST.Assignment(name, expr)}

//////////////////////////////// expression /////////////////////////////

expr
  = _ "fn" expr:function_definition 
  {return expr}
  / _ "if" expr:if_expression 
  {return expr}
  / boolean_expression
  / arithmetic_expression


/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = head:arithmetic_expression rest:(relop arithmetic_expression)*
    { return rollupBinOp(head, rest) }

//////////////////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = head:mult_term rest:(addop mult_term)*
    { return rollupBinOp(head, rest) }

mult_term
  = head:primary rest:(mulop primary)*
    { return rollupBinOp(head, rest) }

primary
  = integer
  /function_call
  /variablevalue
  / _ "(" _ expr:arithmetic_expression _ ")" _
    { return expr }


integer
  = _ number: digits _
    { return new AST.IntegerValue(number) }

addop
  = _ op:[-+] _
    { return op }

mulop
  = _ op:[*/] _
    { return op }

relop
  = '==' / '!=' / '>=' / '>' / '<=' / '<'


/////////////////////// utility NTs //////////////////////////////

function_call
  = variablevalue "(" ")"     // note: no parameters

//////////////////////// function definition /////////////////////////////

function_definition
  = params:param_list code:brace_block
  {return new AST.funcDef(params, code)}

param_list
   = "(" ")"

brace_block
  = _ "{" c:code "}" _
  {return c}

_ "whitespace"
  = [ \t\n\r]*

digits            
  = [-+]? [0-9]+
   { return parseInt(text(), 10) }