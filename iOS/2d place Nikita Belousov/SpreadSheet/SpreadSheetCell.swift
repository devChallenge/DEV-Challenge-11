import Foundation
import SpreadsheetView

class SpreadSheetCell: Cell {
    
    let label = UILabel()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        label.frame = bounds
        label.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 14, weight: UIFontWeightMedium)
        label.textAlignment = .right
        
        contentView.addSubview(label)
        
        let selectedBackgroundView = UIView()
        selectedBackgroundView.backgroundColor = UIColor.groupTableViewBackground
        self.selectedBackgroundView = selectedBackgroundView
        
    }
    
    override var frame: CGRect {
        didSet {
            label.frame = bounds.insetBy(dx: 6, dy: 0)
        }
    }
    
    override func prepareForReuse() {
        backgroundView?.removeFromSuperview()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
