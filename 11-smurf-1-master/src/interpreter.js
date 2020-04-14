//interpreter class for traversing ast nodes
export default class Interpreter {
    //visit function
    visit(node){
        return node.accept(this);
    }

    //evaulate a binary operation
    visitBinOp(node){
        let left = node.left.accept(this);
        return node.operation.reduce(
            (result, [op, right]) => {
                right = right.accept(this);
                switch(op){
                    case '+':
                        return result + right;
                    case '-':
                        return result - right;
                    case '*':
                        return result * right;
                    case '/':
                        return Math.round(result / right);
                }
            }, left
        )
    }

    //evaluate integer value depending on the sign value
    visitInteger(node){
        if(node.sign === "-")
            return -1 * node.value;
        return node.value;
    }
}