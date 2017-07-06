import Foundation

protocol ExpressionValidatator: class {
    
    func tryCommitChanges(for indexPath: IndexPath, expression: String) -> ValidationResult
    
}
