//
//  ViewController.swift
//  DevChallengeFinal
//
//  Created by 1 1 on 01.07.17.
//  Copyright © 2017 1. All rights reserved.
//

import UIKit
import SpreadsheetView

class SpreadsheetController: UIViewController {

    @IBOutlet var spreadsheetView:SpreadsheetView!
    @IBOutlet var cellIndexLabel:UILabel!
    @IBOutlet var formulaTextField:UITextField!
    
    var currentEditingCellPath:IndexPath?
    
    var spreadsheetCellsData: [[CellData?]] = []
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        
        self.initializeSpreadsheetUI()
        
        spreadsheetCellsData = [[CellData?]](repeating: [CellData?](repeating: nil, count: SpreadsheetConstants.spreadsheetRowsNumber + 1), count: SpreadsheetConstants.spreadsheetColumnsNumber + 1)
        
    }

    private func initializeSpreadsheetUI()
    {
        
        // Spreadsheet
        spreadsheetView.dataSource = self
        spreadsheetView.delegate = self
        spreadsheetView.alwaysBounceVertical = false
        spreadsheetView.alwaysBounceHorizontal = false
        spreadsheetView.gridStyle = .solid(width: 1, color: UIColor.darkGray)
        spreadsheetView.register(UINib(nibName: String(describing: SpreadsheetFrozenCell.self), bundle: nil), forCellWithReuseIdentifier: String(describing: SpreadsheetFrozenCell.self))
        spreadsheetView.register(UINib(nibName: String(describing: SpreadsheetContentCell.self), bundle: nil), forCellWithReuseIdentifier: String(describing: SpreadsheetContentCell.self))
        
        spreadsheetView.intercellSpacing = CGSize(width: 1, height: 1)
        
        // TextView
        formulaTextField.autocapitalizationType = .allCharacters
        formulaTextField.delegate = self
        formulaTextField.isEnabled = false
        formulaTextField.alpha = 0
    }

    // MARK: - UI Actions
    
    func contentCellWasSelected(at indexPath:IndexPath)
    {
        
        if currentEditingCellPath != nil
        {
            self.spreadsheetView.reloadData()
        }
        
        cellIndexLabel.text = "\(self.titleForFrozenColumn(at: indexPath))\(self.titleForFrozenRow(at: indexPath))"
        formulaTextField.isEnabled = true
        currentEditingCellPath = indexPath
        
        UIView.animate(withDuration: 0.1) {
            self.formulaTextField.alpha = 1
        }
        
        
        guard let cellData = self.spreadsheetCellsData[indexPath.column][indexPath.row] else {
            formulaTextField.text = ""
            return
        }
        
        formulaTextField.text = cellData.stringFormula
        
    }
    
    func formulaChangedForCell(at indexPath:IndexPath, newFormulaString:String)
    {
        if self.spreadsheetCellsData[indexPath.column][indexPath.row] == nil {
            self.spreadsheetCellsData[indexPath.column][indexPath.row] = CellData()
            self.spreadsheetCellsData[indexPath.column][indexPath.row]!.spreadSheetDataProvider = self
        }
        
        self.spreadsheetCellsData[indexPath.column][indexPath.row]!.stringFormula = newFormulaString
    }

    func contentCellWasDeselected(at indexPath:IndexPath)
    {
        self.spreadsheetView.reloadData()

        currentEditingCellPath = nil
        formulaTextField.isEnabled = false
        cellIndexLabel.text = ""
        
        UIView.animate(withDuration: 0.1) { 
            self.formulaTextField.alpha = 0
        }
        
    }
    
}

