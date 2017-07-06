
import SpreadsheetView

struct CellModel {
    
    var string: String = ""
    var value: Any = 0
    var formula: String?
    var connectedCellIdentifiers: [String]?
    
}
