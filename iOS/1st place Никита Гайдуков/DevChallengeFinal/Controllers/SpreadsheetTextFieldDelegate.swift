//
//  SpreadsheetTextFieldDelegate.swift
//  DevChallengeFinal
//
//  Created by 1 1 on 01.07.17.
//  Copyright © 2017 1. All rights reserved.
//

import Foundation
import UIKit

extension SpreadsheetController:UITextFieldDelegate
{
    func textFieldDidBeginEditing(_ textField: UITextField)
    {
        
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        textField.text = (textField.text as NSString?)?.replacingCharacters(in: range, with: string.uppercased())
        textField.sendActions(for: UIControlEvents.editingChanged)
        return false
    }

    
    func textFieldDidEndEditing(_ textField: UITextField)
    {
        self.contentCellWasDeselected(at: self.currentEditingCellPath ?? IndexPath(row: 0, column: 0))
    }
    
    @IBAction func textFieldDidChangedValue(_ sender:UITextField)
    {
        self.formulaChangedForCell(at: self.currentEditingCellPath ?? IndexPath(row: 0, column: 0), newFormulaString: sender.text ?? "")
    }
}
