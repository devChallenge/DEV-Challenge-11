import UIKit
import ReactiveSwift
import ReactiveCocoa

class EditExpressionViewController: UIViewController {
    
    var editedItemIndexPath: IndexPath!
    var editedItemInitialExpression: String!
    
    weak var validator: ExpressionValidatator?
    
    @IBOutlet weak var textView: UITextView!
    
    @IBAction func tryCommit(_ sender: Any) {
    
        guard let validator = validator else {
            fatalError("internal inconsistency")
        }
        
        switch validator.tryCommitChanges(for: editedItemIndexPath, expression: textView.text) {
        case .success:
            dismiss(animated: true, completion: nil)
        case .error(let description):
            presentAlert(message: description)
        }
    }
    
    @IBAction func cancel(_ sender: Any) {
        
        dismiss(animated: true, completion: nil)
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.textView.text = editedItemInitialExpression
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        textView.becomeFirstResponder()
        // setup textView's insets depending on keyboard frame
        let topInset = textView.contentInset.top
        textView.reactive.contentInset <~ NotificationCenter.default.reactive.keyboardChange.map { UIEdgeInsets(top: topInset, left: 8, bottom: $0.endFrame.size.height + 8, right: 8) }
    }
   
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        textView.resignFirstResponder()
    }
    
}
