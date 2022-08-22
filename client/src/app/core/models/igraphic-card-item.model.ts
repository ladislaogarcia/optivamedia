export interface Memory {
  size: string;
  type: string;
}

export interface Specifications {
  memory: Memory;
  boostClockSpeed: string;
  dimensions: string;
  weight: string;
}

export interface Price {
  current: number;
  original: number;
}

export interface Valoration {
  avg: number;
}

export interface IGraphicCardItem {
  id: number;
  name: string;
  description: string;
  currency: string;
  original_image_url: string;
  original_pictures: string[];
  manufacturer: string;
  assembler: string;
  specifications: Specifications;
  accessories: any[];
  price: Price;
  valoration: Valoration;
}
