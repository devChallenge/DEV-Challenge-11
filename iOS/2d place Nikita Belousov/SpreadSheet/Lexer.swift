import Foundation

enum Token {
    case identifier(String)
    case number(Float)
    case parensOpen
    case parensClose
    case other(String)
}

typealias TokenGenerator = (String) -> Token?
let tokenList: [(String, TokenGenerator)] = [
    ("[ \t\n]", { _ in nil }),
    ("[a-zA-Z][a-zA-Z0-9]*", { .identifier($0) }),
    ("[0-9.]+", { (r: String) in .number((r as NSString).floatValue) }),
    ("\\(", { _ in .parensOpen }),
    ("\\)", { _ in .parensClose }),
]

class Lexer {
    
    let input: String
    
    init(input: String) {
        self.input = input
    }
    
    func tokenize() -> [Token] {
        var tokens = [Token]()
        var content = input
        
        while (content.characters.count > 0) {
            var matched = false
            
            for (pattern, generator) in tokenList {
                if let m = content.match(pattern) {
                    if let t = generator(m) {
                        tokens.append(t)
                    }
                    
                    content = content.substring(from: content.characters.index(content.startIndex, offsetBy: m.characters.count))
                    matched = true
                    break
                }
            }
            
            if !matched {
                let index = content.characters.index(content.startIndex, offsetBy: 1)
                tokens.append(.other(content.substring(to: index)))
                content = content.substring(from: index)
            }
        }
        return tokens
    }
}
