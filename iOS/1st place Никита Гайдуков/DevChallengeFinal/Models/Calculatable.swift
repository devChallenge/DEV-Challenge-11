//
//  Calculatable.swift
//  DevChallengeFinal
//
//  Created by 1 1 on 01.07.17.
//  Copyright © 2017 1. All rights reserved.
//

import Foundation

protocol Calculatable {
    
    func calculateValue() throws -> ExpressionResult
}

extension String
{
    var isFormula:Bool
    {
        get
        {
            return self.hasPrefix("=")
        }
    }
}
