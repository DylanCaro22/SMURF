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
