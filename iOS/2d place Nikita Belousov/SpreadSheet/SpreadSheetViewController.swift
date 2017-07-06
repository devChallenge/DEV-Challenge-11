import UIKit
import SpreadsheetView

let englishLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

extension String {
    var indexPathFromIdentifierUnsafe: IndexPath {
        let i = index(startIndex, offsetBy: 1)
        let letter = englishLetters.index(of: substring(to: i))! + 1
        let number = Int(substring(from: i))!
        return IndexPath(row: number, column: letter)
    }
}

class SpreadSheetViewController: UIViewController {
    
    var elements = SparseTable<(node0: ExprNode, value: String, nonterminals: [IndexPath])>()
    
    @IBOutlet weak var spreadSheetView: SpreadsheetView!
    @IBOutlet weak var eraseButton: UIBarButtonItem!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        spreadSheetView.gridStyle = .solid(width: 1, color: UIColor.lightGray.withAlphaComponent(0.5))
        spreadSheetView.register(SpreadSheetCell.self, forCellWithReuseIdentifier: "Cell")
        spreadSheetView.register(SpreadSheetAxisCell.self, forCellWithReuseIdentifier: "AxisCell")
        spreadSheetView.dataSource = self
        spreadSheetView.delegate = self
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        if let indexPath = sender as? IndexPath,
            let navigationController = segue.destination as? UINavigationController,
            let editExpressionViewController = navigationController.topViewController as? EditExpressionViewController {
            
            editExpressionViewController.editedItemIndexPath = indexPath
            
            if let node0 = elements[indexPath]?.node0 {
                editExpressionViewController.editedItemInitialExpression = calculateString(from: node0)
            } else {
                editExpressionViewController.editedItemInitialExpression = ""
            }
            
            editExpressionViewController.validator = self
            
        }
    }
    
    @IBAction func eraseAll(_ sender: Any) {
        elements = SparseTable()
        spreadSheetView.reloadData()
    }

}

extension SpreadSheetViewController: ExpressionValidatator {
    
    struct Error: Swift.Error, CustomStringConvertible {
        let description: String
    }
    
    private func recalculateAll() {
        
        let nonEmptyIndexPath = elements.allElements.map { $0.key }
        for indexPath in nonEmptyIndexPath {
            try? elements[indexPath]!.value = String(value(for: elements[indexPath]!.node0))
        }
        
    }
    
    func calculateString(from node0: ExprNode) -> String {
        // не успел ((
        return node0.description
    }
    
    /// Unsafe, requires a valid state
    private func value(for node0: ExprNode) throws -> Float  {
        
        switch node0 {
        case let numberNode as NumberNode:
            return numberNode.value
        case let variableNode as VariableNode:
            guard let nonEmptyElement = elements[variableNode.name.indexPathFromIdentifierUnsafe] else {
                throw Error(description: "Error: trying to use value of an empty cell")
            }
            return try value(for: nonEmptyElement.node0)
        case let binaryOperationNode as BinaryOpNode:
            switch binaryOperationNode.op {
            case "+":
                return try value(for: binaryOperationNode.lhs) + value(for: binaryOperationNode.rhs)
            case "-":
                return try value(for: binaryOperationNode.lhs) - value(for: binaryOperationNode.rhs)
            case "/":
                return try value(for: binaryOperationNode.lhs) / value(for: binaryOperationNode.rhs)
            case "*":
                return try value(for: binaryOperationNode.lhs) * value(for: binaryOperationNode.rhs)
            default:
                fatalError("internal inconsistency")
            }
        default:
            fatalError("internal inconsistency")
        }
        
    }
    
    func tryCommitChanges(for indexPath: IndexPath, expression: String) -> ValidationResult {
        
        defer {
            spreadSheetView.reloadData()
        }
        
        let tokens = Lexer(input: expression).tokenize()
        do {
            let node0 = try Parser(tokens: tokens).parse().first as! ExprNode
            let rhsNonterminals = try tokens.filter { (token: Token) throws -> Bool in
                switch token {
                case .identifier(_):
                    return true
                case _:
                    return false
                }
            }
            .map { (token: Token) throws -> IndexPath in
                switch token {
                case .identifier(let value):
                    // up to this point, all identifiers are supposed to be valid
                    return value.indexPathFromIdentifierUnsafe
                case _:
                    fatalError()
                }
            }
            
            // if expresssion doesn't have rhs nonterminals, calculate value and complete
            if rhsNonterminals.isEmpty {
                elements[indexPath] = (node0: node0, value: String(try value(for: node0)), nonterminals: [])
                return .success
            }
        
            // check for recursion nonterminals
            
            var set = Set(rhsNonterminals)
            
            var prevSetSize = 0
            var curSetSize = set.count
            
            while prevSetSize != curSetSize {
                prevSetSize = curSetSize
                // preform bfs iteration
                let derivedNonterminals = set.flatMap { self.elements[$0]?.nonterminals ?? [] }
                set = Set(derivedNonterminals)
                curSetSize = set.count
            }
            
            if set.contains(indexPath) {
                return .error(description: "Error: expression contains recursion")
            }
            
            elements[indexPath] = (node0: node0, value: String(try value(for: node0)), nonterminals: rhsNonterminals)
            recalculateAll()
            return .success

        } catch {
            return .error(description: "Error: \(error)")
        }
        
    }
    
}

extension SpreadSheetViewController: SpreadsheetViewDelegate {
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, didSelectItemAt indexPath: IndexPath) {
        
        guard indexPath.row != 0 && indexPath.column != 0 else {
            return
        }
        
        spreadSheetView.deselectItem(at: indexPath, animated: true)
        performSegue(withIdentifier: "EditExpression", sender: indexPath)
    }
    
}

extension SpreadSheetViewController: SpreadsheetViewDataSource {
    
    func frozenRows(in spreadsheetView: SpreadsheetView) -> Int {
        return 1
    }
    
    func frozenColumns(in spreadsheetView: SpreadsheetView) -> Int {
        return 1
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, cellForItemAt indexPath: IndexPath) -> Cell? {
        
        if indexPath.row == 0 || indexPath.column == 0 {
            
            // axis cell
            guard let cell = spreadSheetView.dequeueReusableCell(withReuseIdentifier: "AxisCell", for: indexPath) as? SpreadSheetAxisCell else {
                fatalError("internal inconsistency")
            }
            
            guard indexPath.row != 0 || indexPath.column != 0 else {

                cell.label.text = nil
                return cell
            }
            
            cell.label.text = indexPath.row == 0 ? englishLetters[indexPath.column - 1] : String(indexPath.row)
            return cell
        }
        
        guard let cell = spreadSheetView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as? SpreadSheetCell else {
            fatalError("internal inconsistency")
        }
        cell.label.text = elements[indexPath]?.value ?? ""
        return cell
    }
    
    func numberOfColumns(in spreadsheetView: SpreadsheetView) -> Int {
        return englishLetters.count + 1
    }
    
    func numberOfRows(in spreadsheetView: SpreadsheetView) -> Int {
        return 200
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, widthForColumn column: Int) -> CGFloat {
        return column == 0 ? 60 : 100
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, heightForRow row: Int) -> CGFloat {
        return 40
    }
    
}
