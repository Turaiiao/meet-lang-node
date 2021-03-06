"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetStatement = exports.CallFunStatement = exports.DefineFunStatement = exports.BreakStatement = exports.ForStatement = exports.ListStatement = exports.WhileStatement = exports.IfStatement = exports.PlusStatement = exports.MinusStatement = exports.ForEachStatement = exports.PrintLineStatement = exports.PrintStatement = exports.FuckStatement = exports.BinaryExpressionStatement = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BinaryExpressionStatement =
/*#__PURE__*/
function () {
  function BinaryExpressionStatement(left, operator, right) {
    _classCallCheck(this, BinaryExpressionStatement);

    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  _createClass(BinaryExpressionStatement, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.left, " ").concat(this.operator, " ").concat(this.right);
    }
  }]);

  return BinaryExpressionStatement;
}();

exports.BinaryExpressionStatement = BinaryExpressionStatement;

var FuckStatement =
/*#__PURE__*/
function () {
  function FuckStatement(name, value) {
    _classCallCheck(this, FuckStatement);

    this.name = name;
    this.value = value;
  }

  _createClass(FuckStatement, [{
    key: "toString",
    value: function toString() {
      return "fuck ".concat(this.name, " -> ").concat(this.value, ";");
    }
  }]);

  return FuckStatement;
}();

exports.FuckStatement = FuckStatement;

var PrintStatement =
/*#__PURE__*/
function () {
  function PrintStatement(type, name, value) {
    _classCallCheck(this, PrintStatement);

    this.type = type;
    this.name = name;
    this.value = value;
  }

  _createClass(PrintStatement, [{
    key: "toString",
    value: function toString() {
      return "print -> ".concat(this.name, ";");
    }
  }]);

  return PrintStatement;
}();

exports.PrintStatement = PrintStatement;

var PrintLineStatement =
/*#__PURE__*/
function () {
  function PrintLineStatement(type, name, value) {
    _classCallCheck(this, PrintLineStatement);

    this.type = type;
    this.name = name;
    this.value = value;
  }

  _createClass(PrintLineStatement, [{
    key: "toString",
    value: function toString() {
      return "printLine -> ".concat(this.name, ";");
    }
  }]);

  return PrintLineStatement;
}();

exports.PrintLineStatement = PrintLineStatement;

var ForEachStatement =
/*#__PURE__*/
function () {
  function ForEachStatement(name) {
    _classCallCheck(this, ForEachStatement);

    this.name = name;
  }

  _createClass(ForEachStatement, [{
    key: "toString",
    value: function toString() {
      return "forEach -> ".concat(this.name, ";");
    }
  }]);

  return ForEachStatement;
}();

exports.ForEachStatement = ForEachStatement;

var MinusStatement =
/*#__PURE__*/
function () {
  function MinusStatement(name) {
    _classCallCheck(this, MinusStatement);

    this.name = name;
  }

  _createClass(MinusStatement, [{
    key: "toString",
    value: function toString() {
      return "minus -> ".concat(this.name, ";");
    }
  }]);

  return MinusStatement;
}();

exports.MinusStatement = MinusStatement;

var PlusStatement =
/*#__PURE__*/
function () {
  function PlusStatement(name) {
    _classCallCheck(this, PlusStatement);

    this.name = name;
  }

  _createClass(PlusStatement, [{
    key: "toString",
    value: function toString() {
      return "plus -> ".concat(this.name, ";");
    }
  }]);

  return PlusStatement;
}();

exports.PlusStatement = PlusStatement;

var IfStatement =
/*#__PURE__*/
function () {
  function IfStatement(condition, establish, contrary) {
    _classCallCheck(this, IfStatement);

    this.condition = condition;
    this.establish = establish;
    this.contrary = contrary;
  }

  _createClass(IfStatement, [{
    key: "toString",
    value: function toString() {
      if (contrary != undefined) {
        return "if ".concat(this.condition, " {\n                ").concat(this.establish, "\n            } else {\n                ").concat(this.contrary, "\n            }");
      } else {
        return "if ".concat(this.condition, " {\n                ").concat(this.establish, "\n            }");
      }
    }
  }]);

  return IfStatement;
}();

exports.IfStatement = IfStatement;

var WhileStatement =
/*#__PURE__*/
function () {
  function WhileStatement(condition, establish) {
    _classCallCheck(this, WhileStatement);

    this.condition = condition;
    this.establish = establish;
  }

  _createClass(WhileStatement, [{
    key: "toString",
    value: function toString() {
      return "while ".concat(this.condition, " {\n            ").concat(this.establish, "\n        }");
      s;
    }
  }]);

  return WhileStatement;
}();

exports.WhileStatement = WhileStatement;

var ListStatement =
/*#__PURE__*/
function () {
  function ListStatement(type, value) {
    _classCallCheck(this, ListStatement);

    this.type = type;
    this.value = value;
  }

  _createClass(ListStatement, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.type, " list[").concat(this.value, "];");
    }
  }]);

  return ListStatement;
}();

exports.ListStatement = ListStatement;

var ForStatement =
/*#__PURE__*/
function () {
  function ForStatement(establish) {
    _classCallCheck(this, ForStatement);

    this.establish = establish;
  }

  _createClass(ForStatement, [{
    key: "toString",
    value: function toString() {
      return "for {\n            ".concat(this.establish, "\n        }");
    }
  }]);

  return ForStatement;
}();

exports.ForStatement = ForStatement;

var BreakStatement =
/*#__PURE__*/
function () {
  function BreakStatement() {
    _classCallCheck(this, BreakStatement);

    this.name = 'break';
  }

  _createClass(BreakStatement, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, ";");
    }
  }]);

  return BreakStatement;
}();

exports.BreakStatement = BreakStatement;

var DefineFunStatement =
/*#__PURE__*/
function () {
  function DefineFunStatement(name, establish) {
    _classCallCheck(this, DefineFunStatement);

    this.name = name;
    this.establish = establish;
  }

  _createClass(DefineFunStatement, [{
    key: "toString",
    value: function toString() {
      return "fun ".concat(this.name, " => {\n            ").concat(this.establish, "\n        }");
    }
  }]);

  return DefineFunStatement;
}();

exports.DefineFunStatement = DefineFunStatement;

var CallFunStatement =
/*#__PURE__*/
function () {
  function CallFunStatement(name) {
    _classCallCheck(this, CallFunStatement);

    this.name = name;
  }

  _createClass(CallFunStatement, [{
    key: "toString",
    value: function toString() {
      return "fun -> ".concat(this.name);
    }
  }]);

  return CallFunStatement;
}();

exports.CallFunStatement = CallFunStatement;

var SetStatement =
/*#__PURE__*/
function () {
  function SetStatement(type, name, value) {
    _classCallCheck(this, SetStatement);

    this.type = type;
    this.name = name;
    this.value = value;
  }

  _createClass(SetStatement, [{
    key: "toString",
    value: function toString() {
      return "set ".concat(this.name, " -> ").concat(this.value);
    }
  }]);

  return SetStatement;
}();

exports.SetStatement = SetStatement;