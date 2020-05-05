# Week 3

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | All passed  |     65 |
| extras         | All passed  |     10 |  ** very nice **
| Coding         |             |     21 |
| Late submission|             |    -10 |
| **TOTAL**      |             |     86 |

Notes on the code:

File: Interpreter.js
48:   looper(params)
49:   {
50:     params.forEach((param, index) => {
51:       params[index] = param[2].accept(this) //used to ignore extra characters that aren't neccesary
52:     })
53:   }

This makes me feel dirty for two reasons. First, the AST should never
contain "extra characters that aren't necessary". You need to make the
grammar work in such a way that they are never added.

Second, you're modifying the incoming data in the AST. If we have
something else running against the same SMURF program, it would be hosed.


File: Interpreter.js
70:     while (this.binding.parent != null) {
71:       this.binding = this.binding.pop()
72:     }

This seems wrong to me: you add just one binding to the set of bindings,
but here you remove all but the top level. I'm guessing this would break
given nested function calls.

# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | All passed  |     65 |
| extras         | 3 failures  |      6 |
| Coding         |             |     23 |
| **TOTAL**      |             |     84 |

Test failures:  (in my torture tests)

- `if (0) { 99 }` has no else clause. The interpreter assumes all
  if statements do, and so I get

  ~~~
  src/visitors/interpreter.js:46

   45:     }else{
   46:         return rest.accept(this);
   47:     }

  Error thrown in test:

  TypeError {
    message: 'rest.accept is not a function',
  }
  ~~~

  I suggest changing grammar.pegjs to

  ~~~ js
  / condition:expr ifPart:brace_block
    {return new AST.ifStatement(condition, ifPart, new Integer(0))}
                                                   ^^^^^^^^^^^^^^
   ~~~

  returns `undefined` for `if 0 { 99 }`. It should either raise an error
  or return 0.

- your binding code does check for duplicate definitions of a variable
  (two `let`s for the same variable), which is great. However, it
  doesn't check for attempts to access a variable that hasn't been
  defined.

Code observations:

- you need to be consistent in the naming of things. For example, some
  of the AST class names start with an upper case letter, and others a
  lower case letter.



# Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | All passed  |     65 |
| 00-test_extras | All passed  |     10 |
| Coding         |             |     25 |
| **TOTAL**      |             |    100 |

Very nice.

Two observations:

1. I don't think I'd have had the IntegerValue node include a separate
   sign: "-1" is a compile-time constant, and it seems to me that the
   actual value -1 should be stored.

2. You chose to do the reduce for BinOp in the interpreter, not the
   parser. That's interesting: I haven't seen that before.

   There's nothing wrong with that in this instance, but I wonder if it
   might make it harder to add additional visitors to the AST; each one
   of them would have to include the reduce code. If the reduction is
   done during the parse, then it's just in one place.
