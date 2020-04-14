{
    const AST = options.AST;
}

arithmetic_expression
  = left:mult_term right:(addop mult_term)*
    { return new AST.BinOp(left, right) }

mult_term
  = left:primary right:(mulop primary)*
    { return new AST.BinOp(left, right) }

primary
  = integer
  / _ "(" exp:arithmetic_expression ")" _
  { return exp }
integer
  = _ sign:("+" / "-")? digits:digits _ 
  { return new AST.IntegerValue(sign, parseInt(digits.join(""), 10)) }

digits
 = numbers+

numbers
  = "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"

addop
  = '+' / '-' 

mulop
  = '*' / '/' 

_ "whitespace"
  = [ \t\n\r]*
