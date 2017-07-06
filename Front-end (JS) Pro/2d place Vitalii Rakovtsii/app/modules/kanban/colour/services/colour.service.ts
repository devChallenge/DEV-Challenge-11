import { Injectable } from '@angular/core';
import { ColourMap, ColourNameMap } from '../colour.enum';

@Injectable()
export class ColourService {

	getAllColours(): any[] {
		return Array.from(ColourNameMap)
			.map(([key, value]) => [key, ColourMap.get(key), value]);
	}

}
