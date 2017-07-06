//
//  CellData.swift
//  DevChallengeFinal
//
//  Created by 1 1 on 01.07.17.
//  Copyright © 2017 1. All rights reserved.
//

import Foundation

protocol SpreadsheetDataProvider {
    func cellData(for indexLiteral:String) -> CellData?
}

class CellData:Calculatable
{
    var spreadSheetDataProvider:SpreadsheetDataProvider?
    var dependeciesIndexes:[String] = []
    
    var stringFormula = ""
    {
        didSet
        {
            stringFormula = stringFormula.replacingOccurrences(of: ",", with: ".")
            dependeciesIndexes = self.parseStringFormula()
        }
    }
    
    func calculateValue() throws -> ExpressionResult
    {        
        if !stringFormula.isFormula
        {
            if let decimalValue = Float(stringFormula)
            {
                return ExpressionResult.decimalType(value: decimalValue)
            }
            
            return ExpressionResult.stringType(value: stringFormula)
        }
        
        var dependeciesData = [CellData]()
        for dependecyIndex in dependeciesIndexes
        {
            if let dependecyData = spreadSheetDataProvider?.cellData(for: dependecyIndex)
            {
                dependeciesData.append(dependecyData)
                
            }
            else
            {
                throw NSError()
            }
        }
        
        let actualFormula = String(stringFormula.characters.dropFirst())
        
        // Calculate expression
        var parametersDictionary = [String:Float]()
        var allDependenciesValues = [ExpressionResult]()
        var isDecimalExpression = true
        for (dependecyData , dependecyIndex) in zip(dependeciesData,dependeciesIndexes)
        {
            let result = try dependecyData.calculateValue()
            allDependenciesValues.append(result)
            
            if case .decimalType(let value) = result
            {
                parametersDictionary[dependecyIndex] = value
            }
            else
            {
                isDecimalExpression = false
            }
        }
        
        
        if isDecimalExpression
        {
            let expression = NSExpression(format: actualFormula)
            if let result = expression.expressionValue(with: parametersDictionary, context: nil) as? Float
            {
                return ExpressionResult.decimalType(value: result)
            }
            else
            {
                throw NSError()
            }
        }
        else
        {
            if case .stringType(let val) = allDependenciesValues.first! , dependeciesIndexes.first == actualFormula
            {
                return ExpressionResult.stringType(value: val)
            }
            else
            {
                throw NSError()
            }
        }
    }
    
    private func parseStringFormula() -> [String]
    {
        if !stringFormula.isFormula
        {
            return []
        }
        
        var dependeciesIndexesParsed:[String] = []
        
        let actualFormula = String(stringFormula.characters.dropFirst()).replacingOccurrences(of: " ", with: "")
        
        let separatorsCharSet = CharacterSet.symbols.union(CharacterSet(charactersIn:"*()/-"))
        let wordsArray = actualFormula.components(separatedBy: separatorsCharSet)
        
        for word in wordsArray
        {
            if let letterRange = word.rangeOfCharacter(from: CharacterSet.letters, options: String.CompareOptions.caseInsensitive, range: nil)
            , let numberRange = word.rangeOfCharacter(from: CharacterSet.decimalDigits, options: String.CompareOptions.caseInsensitive, range: nil)
            {

                let letterDistance = word.distance(from: word.startIndex, to: letterRange.lowerBound)
                let numberDistance = word.distance(from: word.startIndex, to: numberRange.lowerBound)
                
                if letterDistance == 0
                    && numberDistance >= 1
                {
                    dependeciesIndexesParsed.append(word)
                }
            }
        }
        
        return dependeciesIndexesParsed
    }
}
