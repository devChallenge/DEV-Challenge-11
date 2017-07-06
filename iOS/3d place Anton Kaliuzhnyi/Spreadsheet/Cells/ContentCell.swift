
import UIKit
import SpreadsheetView

protocol ContentCellDelegate: class {
    func contentCellDidBeginEditing(_ contentCell: ContentCell)
    func contentCellDidEndEditing(_ contentCell: ContentCell)
}

extension ContentCellDelegate {
    func contentCellDidBeginEditing(_ contentCell: ContentCell) {}
    func contentCellDidEndEditing(_ contentCell: ContentCell) {}
}

class ContentCell: Cell, UITextFieldDelegate {
    
    @IBOutlet weak var textField: UITextField!
    
    weak var delegate: ContentCellDelegate?
    
    var indexPath: IndexPath!
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        self.delegate?.contentCellDidBeginEditing(self)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.endEditing(true)
        return true
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        self.delegate?.contentCellDidEndEditing(self)
    }
    
}
