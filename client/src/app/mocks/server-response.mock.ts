import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { IServerResponseModel } from '@core/models/iserver-response.model';

export function MockServerResponse(): IServerResponseModel {
  const items: IGraphicCardItem[] = [
    {
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
      price: {
        current: 2795.16,
        original: 2795.16
      },
      valoration: {
        avg: 9.75
      }
    },
    {
      id: 2,
      name: 'MSI AMD Radeon RX 6900 XT GAMING X TRIO 16GB GDDR6',
      description:
        'Presentamos las tarjetas gráficas AMD Radeon ™ RX 6000 Series, con la revolucionaria arquitectura AMD RDNA ™ 2, diseñada para brindar un rendimiento ultra alto, una resolución ultra alta y juegos visualmente impresionantes para todos. Estamos impulsando la próxima generación de juegos.',
      currency: 'EUR',
      original_image_url:
        'https://res-1.cloudinary.com/grover/image/upload/v1642009027/gb6lr0bkui9xlcpty0fi.png',
      original_pictures: [
        'https://res-1.cloudinary.com/grover/image/upload/v1642009027/gb6lr0bkui9xlcpty0fi.png',
        'https://res-5.cloudinary.com/grover/image/upload/v1642009040/egkjslsfyegk2vmwli5x.png',
        'https://res-1.cloudinary.com/grover/image/upload/v1642009054/j27xco5binmdno9bbp4l.png',
        'https://res-1.cloudinary.com/grover/image/upload/v1642009067/wvdlqbr4ziklmr0wmlvl.png'
      ],
      manufacturer: 'AMD',
      assembler: 'MSI',
      price: {
        current: 1770.65,
        original: 2036.24
      },
      valoration: {
        avg: 9.17
      }
    },
    {
      id: 3,
      name: 'Zotac Gaming GeForce RTX 3080 Ti Trinity OC LHR 12GB GDDR6X',
      description:
        'Obtenga amplificación con la serie ZOTAC GAMING GeForce RTXTM 30 basada en la arquitectura NVIDIA Ampere. Construida con RT Cores y Tensor Cores mejorados, nuevos multiprocesadores de transmisión y memoria GDDR6X ultrarrápida, ZOTAC GAMING GeForce RTX 3080 Trinity OC LHR 12GB da lugar a juegos amplificados con una fidelidad gráfica ultra elegante.',
      currency: 'EUR',
      original_image_url:
        'https://res-3.cloudinary.com/grover/image/upload/v1619436248/wferlro4uneta3mhq0xb.png',
      original_pictures: [
        'https://res-3.cloudinary.com/grover/image/upload/v1619436248/wferlro4uneta3mhq0xb.png',
        'https://res-2.cloudinary.com/grover/image/upload/v1619428518/p1uehbwluqmf5u0xpvgt.png',
        'https://res-2.cloudinary.com/grover/image/upload/v1619428527/lhlu3ngpcxjzgcxjk6wo.png'
      ],
      manufacturer: 'Nvidia',
      assembler: 'Zotac',
      price: {
        current: 899.89,
        original: 899.89
      },
      valoration: {
        avg: 10
      }
    },
    {
      id: 4,
      name: 'AMD Radeon Pro WX 9100 16GB GDDR5 HBM2',
      description:
        'AMD Radeon Pro proporciona el rendimiento, las caractersticas y la fiabilidad necesarias para abordar los flujos de trabajo profesionales que van desde el diseo y la simulacin del producto, hasta la postproduccin de video y los efectos visuales. Con una estricta calificación del producto, certificaciones de aplicaciones, optimizaciones de rendimiento y actualizaciones regulares de controladores empresariales, los profesionales pueden estar seguros de una experiencia visual de alta calidad y tranquilidad al trabajar en proyectos importantes.',
      currency: 'EUR',
      original_image_url:
        'https://thumb.pccomponentes.com/w-530-530/articles/26/263327/amd-radeon-pro-wx-9100-16gb-gddr5-hbm2-caracteristicas.jpg',
      original_pictures: [
        'https://thumb.pccomponentes.com/w-530-530/articles/26/263327/amd-radeon-pro-wx-9100-16gb-gddr5-hbm2-caracteristicas.jpg',
        'https://thumb.pccomponentes.com/w-530-530/articles/26/263327/amd-radeon-pro-wx-9100-16gb-gddr5-hbm2-opiniones.jpg',
        'https://thumb.pccomponentes.com/w-530-530/articles/26/263327/amd-radeon-pro-wx-9100-16gb-gddr5-hbm2-review.jpg',
        'https://thumb.pccomponentes.com/w-530-530/articles/26/263327/amd-radeon-pro-wx-9100-16gb-gddr5-hbm2-foto.jpg'
      ],
      manufacturer: 'AMD',
      assembler: 'AMD ',
      price: {
        current: 2706.38,
        original: 2706.38
      },
      valoration: {
        avg: 8.7
      }
    }
  ];

  const itemsrToReturn: IGraphicCardItem[] = Array(20)
    .fill(() => items[Math.round(Math.random() * items.length)])
    .map((item, idx) => {
      const lotto = Math.round(Math.random() * items.length);
      const newItem: IGraphicCardItem = items[lotto] || items[3];
      newItem.id = idx;
      return { ...newItem };
    });

  return {
    error: false,
    statusCode: 200,
    message: 'OK',
    details: itemsrToReturn
  };
}
