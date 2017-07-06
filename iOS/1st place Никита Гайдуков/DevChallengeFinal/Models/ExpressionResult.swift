//
//  ExpressionResult.swift
//  DevChallengeFinal
//
//  Created by 1 1 on 01.07.17.
//  Copyright © 2017 1. All rights reserved.
//

import Foundation

enum ExpressionResult
{
    case decimalType(value:Float)
    case stringType(value:String)
    
    func toString() -> String
    {
        switch self {
        case .stringType(let val):
            return val
        case .decimalType(let val):
            return String(val)
        }
    }
    
}
