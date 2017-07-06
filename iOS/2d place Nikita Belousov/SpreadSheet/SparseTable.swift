import Foundation

class SparseTable<T> {
    
    var allElements = [IndexPath: T]()
    
    subscript(indexPath: IndexPath) -> T? {
        get {
            return allElements[indexPath]
        }
        set {
            allElements[indexPath] = newValue
        }
    }
    
}
