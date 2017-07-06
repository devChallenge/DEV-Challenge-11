export enum Colour {
	DISABLE = -1,
	NONE = 0,
	RED,
	GREEN,
	BLUE,
	BLACK,
	YELLOW,
	CYAN
}

export const ColourMap = new Map();
export const ColourNameMap = new Map();

ColourMap.set(Colour.NONE, 'transparent');
ColourMap.set(Colour.RED, '#f00');
ColourMap.set(Colour.GREEN, '#0f0');
ColourMap.set(Colour.BLUE, '#4a7ae8');
ColourMap.set(Colour.BLACK, '#000');
ColourMap.set(Colour.YELLOW, '#fff000');
ColourMap.set(Colour.CYAN, '#58e7ff');

ColourNameMap.set(Colour.NONE, 'none');
ColourNameMap.set(Colour.RED, 'red');
ColourNameMap.set(Colour.GREEN, 'green');
ColourNameMap.set(Colour.BLUE, 'blue-ish');
ColourNameMap.set(Colour.BLACK, 'black');
ColourNameMap.set(Colour.YELLOW, 'yellow');
ColourNameMap.set(Colour.CYAN, 'cyan');

