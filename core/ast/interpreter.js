
import { FuckStatement, PrintStatement, PrintLineStatement, IfStatement, WhileStatement, MinusStatement, PlusStatement, BinaryExpressionStatement } from "./ast";

let LETTERS = /[a-z|A-Z]/;

export class Interpreter {

    constructor(ast, env) {
        this.ast = ast.body;
        this.env = env;
        this.node = undefined;
        this.current = 0;
    }

    eval() {

        while (this.current < this.ast.length) {
            this.node = this.ast[this.current];
            this.evalWithNode(this.node);
        }
    }

    evalWithNode(node) {
        if (node instanceof FuckStatement) {
            this.evalFuckStatementNode();
        } else if (node instanceof PrintStatement) {
            this.evalPrintStatementNode();
        } else if (node instanceof PrintLineStatement) {
            this.evalPrintLineStatementNode();
        } else if (node instanceof IfStatement) {
            this.evalIfStatementNode();
        } else if (node instanceof WhileStatement) {
            this.evalWhileStatementNode();
        } else if (node instanceof MinusStatement) {
            this.evalMinusStatementNode();
        } else if (node instanceof PlusStatement) {
            this.evalPlusStatementNode();
        } else {
            throw new TypeError(`解释失败，未知的类型：${node.toString()}`);
        }
    }

    /**
     * { name: 'a', value: '20' }
     */
    evalFuckStatementNode() {
        let name = this.node.name;
        let value = this.node.value;

        if (value instanceof BinaryExpressionStatement) {
            value = this.evalBinaryExpressionNode([ value.left, value.operator, value.right ]);
        }

        this.env.set(name, value);
        this.current ++;
    }

    /**
     * { name: 'a' }
     */
    evalPrintStatementNode() {
        if(this.node.type == 'string') {
            this.logWithOutLine(this.node.value);
            this.current ++;
            return;
        }

        let name = this.node.name;

        if (this.isVariableType(name)) {
            let value = this.env.get(name);

            if (typeof(value) == 'undefined') {
                throw new Error(`找不到变量：${name}`);
            } else {
                this.logWithOutLine(value);
            }
        } else {
            this.logWithOutLine(name);
        }

        this.current ++;
    }

    /**
     * { name: 'a' }
     */
    evalPrintLineStatementNode() {
        if (this.node.type == 'string') {
            this.logWithLine(this.node.value);
            this.current ++;
            return;
        }

        let name = this.node.name;

        if (typeof(name) == 'undefined') {
            this.logWithLine('');
            this.current ++;

            return;
        }

        if (this.isVariableType(name)) {
            let value = this.env.get(name);

            if (typeof(value) == 'undefined') {
                throw new Error(`找不到变量：${name}`);
            } else {
                this.logWithLine(value);
            }
        } else {
            this.logWithLine(name);
        }

        this.current ++;
    }

    /**
     * { name: 'a' }
     */
    evalMinusStatementNode() {
        let name = this.node.name;

        if (! this.isVariableType(name)) {
            throw new TypeError(`不能直接对值进行减法：${name}，仅限变量`);
        }

        let value = this.env.get(name);

        if (typeof(value) == 'undefined') {
            throw new Error(`找不到变量：${name}`);
        }

        value = parseInt(value) - 1;

        this.env.set(name, value);
        this.current ++;
    }

    /**
     * { name: 'a' }
     */
    evalPlusStatementNode() {
        let name = this.node.name;

        if (! this.isVariableType(name)) {
            throw new TypeError(`不能直接对值进行加法：${name}，仅限变量`);
        }

        let value = this.env.get(name);

        if (typeof(value) == 'undefined') {
            throw new Error(`找不到变量：${name}`);
        }

        value = parseInt(value) + 1;

        this.env.set(name, value);
        this.current ++;
    }

    /**
     * 解析表达式、返回布尔值或表达式值
     */
    evalBinaryExpressionNode(ast) {
        let evalLeft = ast[0];
        let evalOperator = ast[1];
        let evalRight = ast[2];

        if (evalLeft instanceof BinaryExpressionStatement) {
            evalLeft = this.evalBinaryExpressionNode([ evalLeft.left, evalLeft.operator, evalLeft.right ]);
            evalOperator = ast[1].value;
            evalRight = ast[2].value;
        } else if (evalRight instanceof BinaryExpressionStatement) {
            evalLeft = ast[0].value;
            evalOperator = ast[1].value;
            evalRight = this.evalBinaryExpressionNode([ evalRight.left, evalRight.operator, evalRight.right ]);
        } else {
            evalLeft = ast[0].value;
            evalOperator = ast[1].value;
            evalRight = ast[2].value;
        }

        if (this.isVariableType(evalLeft)) evalLeft = this.env.get(evalLeft);
        if (this.isVariableType(evalRight)) evalRight = this.env.get(evalRight);

        if (typeof(evalLeft) == 'undefined' || typeof(evalRight) == 'undefined') {
            throw new TypeError(`未知的变量类型：left = ${evalLeft}, operator = ${evalOperator}, right = ${evalRight}`);
        }

        evalLeft = parseInt(evalLeft);
        evalRight = parseInt(evalRight);

        switch (evalOperator) {
            case '>':
                return evalLeft > evalRight;
            case '<':
                return evalLeft < evalRight;
            case '>=':
                return evalLeft >= evalRight;
            case '<=':
                return evalLeft <= evalRight;
            case '==':
                return evalLeft == evalRight;
            case '!=':
                return evalLeft != evalRight;
            case '+':
                return evalLeft + evalRight;
            case '-':
                return evalLeft - evalRight;
            case '*':
                return evalLeft * evalRight;
            case '/':
                return evalLeft / evalRight;
            case '%':
                return evalLeft % evalRight;
            case '+=':
                this.env.set(ast[0].value, evalLeft += evalRight);
                return ast[0].value;
            case '-=':
                this.env.set(ast[0].value, evalLeft -= evalRight);
                return ast[0].value;
            case '*=':
                this.env.set(ast[0].value, evalLeft *= evalRight);
                return ast[0].value;
            case '/=':
                this.env.set(ast[0].value, evalLeft /= evalRight);
                return ast[0].value;
            default:
                throw new TypeError(`未知的操作数：${evalOperator}`);
        }
    }

    /**
     * { condition: [{ name: 'a', operator: '>', name: '20' }], establish: [Array], contrary: [Array] }
     */
    evalIfStatementNode() {
        let ifStmt = this.node;
        let condition = this.evalBinaryExpressionNode(ifStmt.condition);
        let tempCurrent = this.current;

        if (condition) {
            for (let i = 0; i < ifStmt.establish.length; i ++) {
                this.refreshNodeWithOther(ifStmt.establish[i]);
                this.evalWithNode(ifStmt.establish[i]);
            }
        } else if (typeof(ifStmt.contrary) != 'undefined') {
            for (let i = 0; i < ifStmt.contrary.length; i ++) {
                this.refreshNodeWithOther(ifStmt.contrary[i]);
                this.evalWithNode(ifStmt.contrary[i]);
            }
        }

        this.current = tempCurrent;
        this.current ++;
    }

    /**
     * { condition: [{ name: 'a', operator: '>', name: '20' }], establish: [Array] }
     */
    evalWhileStatementNode() {
        let whileStmt = this.node;
        let condition = this.evalBinaryExpressionNode(whileStmt.condition);
        let tempCurrent = this.current;

        while (condition) {
            for (let i = 0; i < whileStmt.establish.length; i ++) {
                this.refreshNodeWithOther(whileStmt.establish[i]);
                this.evalWithNode(whileStmt.establish[i]);
            }

            condition = this.evalBinaryExpressionNode(whileStmt.condition);
        }

        this.current = tempCurrent;
        this.current ++;
    }

    /**
     * 判断是不是变量
     */
    isVariableType(n) {
        return LETTERS.test(n);
    }

    /**
     * 刷新当前的节点
     */
    refreshNode(position) {
        this.node = this.ast[position];
    }

    /**
     * 刷新指定的节点
     */
    refreshNodeWithOther(node) {
        this.node = node;
    }

    /**
     * 输出当前节点
     */
    showCurrentNode() {
        console.log(this.ast[this.current]);
    }

    /**
     * 打印并且换行
     */
    logWithLine(v) {
        process.stdout.write(v + '\n');
    }

    /**
     * 打印但是不换行
     */
    logWithOutLine(v) {
        process.stdout.write(v);
    }
}