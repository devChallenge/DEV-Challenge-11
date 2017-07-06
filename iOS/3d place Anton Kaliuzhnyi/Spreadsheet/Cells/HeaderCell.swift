
import UIKit
import SpreadsheetView

class HeaderCell: Cell {
    
    @IBOutlet weak var label: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        backgroundColor = UIColor(white: 0.95, alpha: 1.0)
    }
    
}
