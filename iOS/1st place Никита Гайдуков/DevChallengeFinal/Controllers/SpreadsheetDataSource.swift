//
//  SpreadsheetDataSource.swift
//  DevChallengeFinal
//
//  Created by 1 1 on 01.07.17.
//  Copyright © 2017 1. All rights reserved.
//

import Foundation
import SpreadsheetView

enum SpreadsheetCellId:String
{
    case spreadsheetFrozenCell = "SpreadsheetFrozenCell"
    case spreadsheetContentCell = "SpreadsheetContentCell"
}


extension SpreadsheetController: SpreadsheetViewDataSource, SpreadsheetViewDelegate
{
    
    //MARK: - DataSource

    func numberOfColumns(in spreadsheetView: SpreadsheetView) -> Int {
        return SpreadsheetConstants.spreadsheetColumnsNumber
    }
    
    func numberOfRows(in spreadsheetView: SpreadsheetView) -> Int {
        return SpreadsheetConstants.spreadsheetRowsNumber
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, widthForColumn column: Int) -> CGFloat {
        return SpreadsheetConstants.spreadsheetCellSize.width
    }
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, heightForRow row: Int) -> CGFloat {
        return SpreadsheetConstants.spreadsheetCellSize.height
    }
    
    func frozenColumns(in spreadsheetView: SpreadsheetView) -> Int {
        return 1
    }
    
    
    func frozenRows(in spreadsheetView: SpreadsheetView) -> Int {
        return 1
    }
    
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, cellForItemAt indexPath: IndexPath) -> Cell? {
        
        
        switch (indexPath.column,indexPath.row) {
        case (0,0):
            let cell = spreadsheetView.dequeueReusableCell(withReuseIdentifier: SpreadsheetCellId.spreadsheetFrozenCell.rawValue, for: indexPath) as! SpreadsheetFrozenCell
            cell.textLabel.text = ""
            
            return cell
        case (0,_):
            let cell = spreadsheetView.dequeueReusableCell(withReuseIdentifier: SpreadsheetCellId.spreadsheetFrozenCell.rawValue, for: indexPath) as! SpreadsheetFrozenCell
            
            cell.textLabel.text = titleForFrozenRow(at: indexPath)
            
            return cell
        
        case (_,0):
            let cell = spreadsheetView.dequeueReusableCell(withReuseIdentifier: SpreadsheetCellId.spreadsheetFrozenCell.rawValue, for: indexPath) as! SpreadsheetFrozenCell
            
            cell.textLabel.text = self.titleForFrozenColumn(at: indexPath)
            
            return cell
            
        case (let column,let row) where column > 0 && row > 0 :
            let cell = spreadsheetView.dequeueReusableCell(withReuseIdentifier: SpreadsheetCellId.spreadsheetContentCell.rawValue, for: indexPath) as! SpreadsheetContentCell
            
            guard let cellData = self.spreadsheetCellsData[indexPath.column][indexPath.row] else
            {
                cell.textLabel.text = ""
                return cell
            }
            do
            {
                try cell.textLabel.text = cellData.calculateValue().toString()
            }
            catch 
            {
                cell.textLabel.text = "ERROR"
            }
            
            return cell
            
        default:
            return nil
        }
        
    }
    
    //MARK: - Delegate
    
    func spreadsheetView(_ spreadsheetView: SpreadsheetView, didSelectItemAt indexPath: IndexPath) {
        
        if indexPath.column > (spreadsheetView.frozenColumns - 1) && indexPath.row > (spreadsheetView.frozenRows - 1)
        {
            //self.contentCellWasSelected(at: IndexPath(row: indexPath.row - spreadsheetView.frozenRows, column: indexPath.column - spreadsheetView.frozenColumns))
            self.contentCellWasSelected(at: indexPath)
        }
        
    }
    
    // MARK: - Title Helpers
    
    func titleForFrozenColumn(at indexPath:IndexPath) -> String
    {
        let charCode = SpreadsheetConstants.alphabetFirstLetterCode + UInt32(indexPath.column) - 1
        
        return String(UnicodeScalar(charCode)!).uppercased()
 
    }
    
    func titleForFrozenRow(at indexPath:IndexPath) -> String
    {
        return "\(indexPath.row)"
    }
    
    // MARK: - Indexing Helpers
    
    func index(from literal:String) -> IndexPath?
    {
        let letterStrIndex = literal.index(literal.startIndex, offsetBy: 0)
        let numbStrIndex = literal.index(after:letterStrIndex)
        let numbStrRange = numbStrIndex..<literal.endIndex
        
        let letter = String(literal[letterStrIndex])

        
        guard let number = String(literal[numbStrRange]) else
        {
            return nil
        }

        let column = Int(letter.unicodeScalars.first!.value - SpreadsheetConstants.alphabetFirstLetterCode + 1)
        guard let row = Int(number) else
        {
            return nil
        }
        
        if (0..<SpreadsheetConstants.spreadsheetRowsNumber).contains(row) && (0..<SpreadsheetConstants.spreadsheetColumnsNumber).contains(column)
        {
            return IndexPath(row: row, column: column)
        }
        
        return nil
    }
    
}


extension SpreadsheetController: SpreadsheetDataProvider
{
    func cellData(for indexLiteral: String) -> CellData? {
        
        guard let indexPath = self.index(from: indexLiteral) else
        {
            return nil
        }
        
        return self.spreadsheetCellsData[indexPath.column][indexPath.row]
    }
    
}

