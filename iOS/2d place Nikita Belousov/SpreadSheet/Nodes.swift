import Foundation

protocol ExprNode: CustomStringConvertible { }

struct NumberNode: ExprNode {
    let value: Float
    var description: String {
        return "NumberNode(\(value))"
    }
}

struct VariableNode: ExprNode {
    let name: String
    var description: String {
        return "VariableNode(\(name))"
    }
}

struct BinaryOpNode: ExprNode {
    let op: String
    let lhs: ExprNode
    let rhs: ExprNode
    var description: String {
        return "BinaryOpNode(\(op), lhs: \(lhs), rhs: \(rhs))"
    }
}
