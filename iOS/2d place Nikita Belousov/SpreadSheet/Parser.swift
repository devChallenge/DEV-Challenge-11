import Foundation

class Parser {
    
    enum Error: Swift.Error {
        case unexpectedToken
        case undefinedIdentifier(String)
        case undefinedOperator(String)
        case expectedCharacter(Character)
        case expectedExpression
    }
    
    private let tokens: [Token]
    private var index = 0
    
    init(tokens: [Token]) {
        self.tokens = tokens
    }
    
    func peekCurrentToken() -> Token {
        return tokens[index]
    }
    
    func popCurrentToken() -> Token {
        let token = tokens[index]
        index += 1
        return token
    }
    
    func parseNumber() throws -> ExprNode {
        guard case let Token.number(value) = popCurrentToken() else {
            throw Error.unexpectedToken
        }
        return NumberNode(value: value)
    }
    
    func parseExpression() throws -> ExprNode {
        let node = try parsePrimary()
        return try parseBinaryOp(node)
    }
    
    func parseParens() throws -> ExprNode {
        guard case Token.parensOpen = popCurrentToken() else {
            throw Error.expectedCharacter("(")
        }
        
        let exp = try parseExpression()
        
        guard case Token.parensClose = popCurrentToken() else {
            throw Error.expectedCharacter(")")
        }
        
        return exp
    }
    
    func parseIdentifier() throws -> ExprNode {
        
        guard case let Token.identifier(name) = popCurrentToken() else {
            throw Error.unexpectedToken
        }
        
        guard let matchedName = name.match("[a-zA-Z][1-9][0-9]*"), matchedName == name else {
            throw Error.undefinedIdentifier(name)
        }
        
        return VariableNode(name: name)
        
    }
    
    func parsePrimary() throws -> ExprNode {
        switch (peekCurrentToken()) {
        case .identifier:
            return try parseIdentifier()
        case .number:
            return try parseNumber()
        case .parensOpen:
            return try parseParens()
        default:
            throw Error.expectedExpression
        }
    }
    
    let operatorPrecedence: [String: Int] = [
        "+": 20,
        "-": 20,
        "*": 40,
        "/": 40
    ]
    
    func getCurrentTokenPrecedence() throws -> Int {
        guard index < tokens.count else {
            return -1
        }
        
        guard case let Token.other(op) = peekCurrentToken() else {
            return -1
        }
        
        guard let precedence = operatorPrecedence[op] else {
            throw Error.undefinedOperator(op)
        }
        
        return precedence
    }
    
    func parseBinaryOp(_ node: ExprNode, exprPrecedence: Int = 0) throws -> ExprNode {
        var lhs = node
        while true {
            let tokenPrecedence = try getCurrentTokenPrecedence()
            if tokenPrecedence < exprPrecedence {
                return lhs
            }
            
            guard case let Token.other(op) = popCurrentToken() else {
                throw Error.unexpectedToken
            }
            
            var rhs = try parsePrimary()
            let nextPrecedence = try getCurrentTokenPrecedence()
            
            if tokenPrecedence < nextPrecedence {
                rhs = try parseBinaryOp(rhs, exprPrecedence: tokenPrecedence+1)
            }
            lhs = BinaryOpNode(op: op, lhs: lhs, rhs: rhs)
        }
    }
    
    func parse() throws -> [Any] {
        index = 0
        var nodes = [Any]()
        while index < tokens.count {
            let expr = try parseExpression()
            nodes.append(expr)
        }
        return nodes
    }
}
