export interface Memory {
  size: string;
  type: string;
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
  price: Price;
  valoration: Valoration;
}
