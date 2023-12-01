export interface ColourOption {
	readonly value: string;
	readonly label: string;
	readonly color: string;
  }
  
  export const colourOptions: readonly ColourOption[] = [
	{ value: 'very-high', label: 'Very High', color: '#ED4C5C'},
	{ value: 'high', label: 'High', color: '#F8A541' },
	{ value: 'normal', label: 'Normal', color: '#00A790' },
	{ value: 'low', label: 'Low', color: '#428BC1'},
	{ value: 'very-low', label: 'Very Low', color: '#8942C1' },
  ];
  
 