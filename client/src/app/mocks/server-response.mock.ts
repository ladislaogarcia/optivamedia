import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { IServerResponseModel } from '@core/models/iserver-response.model';

export function MockServerResponse(): IServerResponseModel {
  const item: IGraphicCardItem = {
    id: 1,
    name: 'ASUS ROG Strix GeForce RTX 3090',
    description:
      'Las GPU GeForce RTX™ serie 30 ofrecen el máximo rendimiento para jugadores y creadores. Con tecnología de Ampere, la arquitectura RTX de la segunda generación de NVIDIA, con nuevos núcleos RT y Tensor y multiprocesadores de streaming para los gráficos de trazado de rayos más realistas y las funciones de inteligencia artificial más innovadoras.',
    currency: 'EUR',
    original_image_url:
      'https://res-1.cloudinary.com/grover/image/upload/v1642009027/gb6lr0bkui9xlcpty0fi.png',
    original_pictures: [
      'https://res-1.cloudinary.com/grover/image/upload/v1642009027/gb6lr0bkui9xlcpty0fi.png',
      'https://res-5.cloudinary.com/grover/image/upload/v1642009040/egkjslsfyegk2vmwli5x.png',
      'https://res-1.cloudinary.com/grover/image/upload/v1642009054/j27xco5binmdno9bbp4l.png',
      'https://res-1.cloudinary.com/grover/image/upload/v1642009067/wvdlqbr4ziklmr0wmlvl.png'
    ],
    manufacturer: 'Nvidia',
    assembler: 'Asus',
    specifications: {
      memory: {
        size: '24GB',
        type: 'GDDR6X'
      },
      boostClockSpeed: '1725 MHz',
      dimensions: '5.78 x 31.85 x 14.01 cm',
      weight: '1 kg'
    },
    accessories: [],
    price: {
      current: 2795.16,
      original: 2795.16
    },
    valoration: {
      avg: 9.75
    }
  };

  const items: IGraphicCardItem[] = Array(20)
    .fill(item)
    .map((item, idx) => {
      item.id = idx;
      return { ...item };
    });

  return {
    error: false,
    statusCode: 200,
    message: 'OK',
    details: items
  };
}
