
import UIKit
import SpreadsheetView

extension String {
    var expression: NSExpression {
        return NSExpression(format: self)
    }
}

class ViewController: UIViewController, SpreadsheetViewDataSource, SpreadsheetViewDelegate, ContentCellDelegate {
    
    @IBOutlet weak var spreadsheetView: SpreadsheetView!
    
    let alphabet = (0..<26).map({String(UnicodeScalar("A".unicodeScalars.first!.value + $0)!)})
    
    var cellModels: [String: CellModel] = [:]
    
    var formulaValues: [String: Any] {
        var values = [String: Any]()
        for (key, cellModel) in self.cellModels {
            values[key] = cellModel.value
        }
        return values
    }
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        spreadsheetView.dataSource = self
        spreadsheetView.delegate = self
        
        spreadsheetView.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
        
        spreadsheetView.intercellSpacing = CGSize(width: 1, height: 1)
        
        spreadsheetView.gridStyle = .solid(width: 1, color: .lightGray)
        
        spreadsheetView.register(UINib.init(nibName: String(describing: HeaderCell.self), bundle: nil), forCellWithReuseIdentifier: String(describing: HeaderCell.self))
        spreadsheetView.register(UINib.init(nibName: String(describing: ContentCell.self), bundle: nil), forCellWithReuseIdentifier: String(describing: ContentCell.self))
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        spreadsheetView.flashScrollIndicators()
    }
    
    // MARK: SpreadsheetViewDataSource
    
    func numberOfColumns(in spreadsheetView: SpreadsheetView) -> Int {
        return 100
    }
    
    func numberOfRows(in spreadsheetView: SpreadsheetView) -> Int {
        return 100
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, widthForColumn column: Int) -> CGFloat {
        if column == 0 {
            return 40
        } else {
            return 100
        }
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, heightForRow row: Int) -> CGFloat {
        return 40
    }
    
    func frozenColumns(in spreadsheetView: SpreadsheetView) -> Int {
        return 1
    }
    
    func frozenRows(in spreadsheetView: SpreadsheetView) -> Int {
        return 1
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, cellForItemAt indexPath: IndexPath) -> Cell? {
        if indexPath.column == 0 || indexPath.row == 0 {
            let cell = spreadsheetView.dequeueReusableCell(withReuseIdentifier: String(describing: HeaderCell.self), for: indexPath) as! HeaderCell
            if case (0, 0) = (indexPath.column, indexPath.row) {
                cell.label.text = ""
            } else if indexPath.column == 0 {
                cell.label.text = String(indexPath.row)
            } else if indexPath.row == 0 {
                cell.label.text = self.cellHeaderName(indexPath: indexPath)
            }
            return cell
        } else {
            let cell = spreadsheetView.dequeueReusableCell(withReuseIdentifier: String(describing: ContentCell.self), for: indexPath) as! ContentCell
            
            cell.delegate = self
            cell.indexPath = indexPath
            
            let headerName = self.cellHeaderName(indexPath: indexPath)
            
            if let cellValue = self.cellModels["\(headerName)\(indexPath.row)"]?.string {
                cell.textField.text = cellValue
            } else {
                cell.textField.text = ""
            }
            return cell
        }
    }
    
    func cellHeaderName(indexPath: IndexPath) -> String {
        let columnIndex = indexPath.column - 1
        var name: String
        if indexPath.column - 1 < alphabet.count {
            name = alphabet[columnIndex]
        } else {
            let q = Double(columnIndex) / Double(alphabet.count)
            let quantityOfLetters = q.rounded(.down)
            let additionalIndex = columnIndex % alphabet.count
            let firstLetter = alphabet[Int(quantityOfLetters - 1)]
            name = firstLetter + alphabet[additionalIndex]
        }
        return name
    }
    
    // MARK: ContentCellDelegate
    
    func contentCellDidBeginEditing(_ contentCell: ContentCell) {
        
        let cellIndexPath = contentCell.indexPath!
        let headerName = self.cellHeaderName(indexPath: cellIndexPath)
        if let cellModel = self.cellModels["\(headerName)\(cellIndexPath.row)"],
            let formula = cellModel.formula {
            contentCell.textField.text = "=\(formula)"
        }
    }
    
    func contentCellDidEndEditing(_ contentCell: ContentCell) {
        let cellIndexPath = contentCell.indexPath!
        let headerName = self.cellHeaderName(indexPath: cellIndexPath)
        let cellIdentifier = "\(headerName)\(cellIndexPath.row)"
        if var formula = contentCell.textField.text, formula.hasPrefix("=") {
            formula.remove(at: formula.startIndex) // Removing the "="
            let pattern = "[A-Z]+[1-9]+[0-9]?"
            let regex = try! NSRegularExpression(pattern: pattern, options: [])
            let matches = regex.matches(in: formula, options: [], range: NSMakeRange(0, formula.characters.count))
            let nsString = formula as NSString
            let cellIdentifiers = matches.map { nsString.substring(with: $0.range) }
            
            if let formulaResult = formula.expression.expressionValue(with: self.formulaValues, context: nil) {
                
                self.cellModels[cellIdentifier] = CellModel(string: String(describing: formulaResult), value: formulaResult, formula: formula, connectedCellIdentifiers: cellIdentifiers)
                contentCell.textField.text = String(describing: formulaResult)
                
            } else {
                self.cellModels[cellIdentifier] = CellModel(string: contentCell.textField.text!, value: contentCell.textField.text!, formula: nil, connectedCellIdentifiers: nil)
            }
            
        } else {
            if let text = contentCell.textField.text, text.characters.count > 0 {
                self.cellModels[cellIdentifier] = CellModel(string: text, value: text, formula: nil, connectedCellIdentifiers: nil)
            } else {
                self.cellModels.removeValue(forKey: cellIdentifier)
            }
        }
        
        self.recalculate(cellIdentifier)
    }
    
    func recalculate(_ cellIdentifier: String) {
        
        if let cellModel = self.cellModels[cellIdentifier],
            let formula = cellModel.formula {
            let pattern = "[A-Z]+[1-9]+[0-9]?"
            let regex = try! NSRegularExpression(pattern: pattern, options: [])
            let matches = regex.matches(in: formula, options: [], range: NSMakeRange(0, formula.characters.count))
            let nsString = formula as NSString
            let cellIdentifiers = matches.map { nsString.substring(with: $0.range) }
            
            if let formulaResult = formula.expression.expressionValue(with: self.formulaValues, context: nil) {
                self.cellModels[cellIdentifier] = CellModel(string: String(describing: formulaResult), value: formulaResult, formula: formula, connectedCellIdentifiers: cellIdentifiers)
                self.spreadsheetView.reloadData()
            }
        }
        for (identifier, cellModel) in self.cellModels {
            if let connectedCellIdentifiers = cellModel.connectedCellIdentifiers,
                connectedCellIdentifiers.contains(cellIdentifier) {
                self.recalculate(identifier)
            }
        }
    }
    
}
