export class BinOp {
    constructor(left, rest){
        this.left = left;
        this.operation = rest;
    }

    accept(visitor){
        return visitor.visitBinOp(this);
    }
}

export class IntegerValue {
    constructor(sign, value){
        this.sign = sign;
        this.value = value;
    }

    accept(visitor){
        return visitor.visitInteger(this);
    }
}