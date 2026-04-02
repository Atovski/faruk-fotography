export interface CameraBrand {
  brand: string;
  models: string[];
}

export const analogCameras: CameraBrand[] = [
  {
    brand: 'Canon',
    models: [
      'AE-1', 'AE-1 Program', 'A-1', 'F-1', 'New F-1', 'FTb', 'EF',
      'AT-1', 'AV-1', 'T50', 'T70', 'T90',
      'Canonet QL17 GIII', 'Canonet 28', 'Demi',
      'Sure Shot / Autoboy', 'Prima Super 135',
    ],
  },
  {
    brand: 'Nikon',
    models: [
      'F', 'F2', 'F2 Photomic', 'F3', 'F3HP', 'F4', 'F5', 'F6',
      'FM', 'FM2', 'FM2n', 'FM3A', 'FE', 'FE2',
      'FA', 'FG', 'FG-20', 'EM',
      'N80 / F80', 'N90s / F90X',
      'Nikonos V',
      'L35AF', 'Lite Touch Zoom',
      '35Ti', '28Ti',
    ],
  },
  {
    brand: 'Minolta',
    models: [
      'X-700', 'X-500', 'X-300', 'X-370',
      'XD-7 / XD-11', 'XE-7', 'XG-1', 'XG-M',
      'SRT 101', 'SRT 102', 'SRT Super',
      'Hi-Matic 7s', 'Hi-Matic AF', 'Hi-Matic AF2',
      'CLE',
      'Alpha 7 / Dynax 7', 'Alpha 9 / Dynax 9',
      'TC-1',
    ],
  },
  {
    brand: 'Olympus',
    models: [
      'OM-1', 'OM-1n', 'OM-2', 'OM-2n', 'OM-2SP',
      'OM-3', 'OM-3Ti', 'OM-4', 'OM-4Ti',
      'OM-10', 'OM-20', 'OM-30', 'OM-40',
      'Mju / Stylus', 'Mju II / Stylus Epic',
      'XA', 'XA2', 'XA3', 'XA4',
      'Trip 35', 'Pen EE', 'Pen F', 'Pen FT',
    ],
  },
  {
    brand: 'Pentax',
    models: [
      'K1000', 'KX', 'KM', 'MX', 'ME', 'ME Super',
      'LX', 'MV', 'MV1',
      'Super A / Program A', 'P30',
      'Spotmatic', 'Spotmatic F', 'Spotmatic II',
      'SV', 'S1a',
      '67', '67II', '645', '645N', '645NII',
      'Espio Mini / UC-1', 'Espio 120',
      'Auto 110',
    ],
  },
  {
    brand: 'Leica',
    models: [
      'M3', 'M2', 'M4', 'M4-P', 'M4-2',
      'M5', 'M6', 'M6 TTL', 'M7', 'MP',
      'CL', 'Minilux', 'Minilux Zoom',
      'IIIf', 'IIIg',
      'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9',
    ],
  },
  {
    brand: 'Contax',
    models: [
      'RTS', 'RTS II', 'RTS III',
      '139 Quartz', '137 MD', '159 MM',
      'Aria', 'AX', 'RX', 'S2', 'S2b', 'ST',
      'T', 'T2', 'T3', 'TVS', 'TVS III',
      'G1', 'G2',
      '645',
    ],
  },
  {
    brand: 'Yashica',
    models: [
      'FX-3 Super 2000', 'FX-D Quartz',
      'FR', 'FR II',
      'Electro 35', 'Electro 35 GT', 'Electro 35 GSN', 'Electro 35 GX',
      'MG-1', 'Minister D',
      'Mat 124G', 'Mat 124',
      'T3', 'T4 / T5', 'T4 Super',
      '44', '44A',
    ],
  },
  {
    brand: 'Mamiya',
    models: [
      'RB67 Pro S', 'RB67 Pro SD',
      'RZ67', 'RZ67 Pro II',
      '645', '645 Pro', '645 Pro TL', '645 Super', 'M645 1000S',
      '7', '7II',
      'C220', 'C330', 'C330f',
      'ZE', 'ZE-2', 'ZM',
      '6', 'Press',
    ],
  },
  {
    brand: 'Hasselblad',
    models: [
      '500C', '500C/M', '501CM', '503CW', '503CXi',
      'SWC', 'SWC/M',
      '2000FC', '2000FCW', '201F', '202FA', '203FE', '205FCC',
      'XPan', 'XPan II',
    ],
  },
  {
    brand: 'Rollei',
    models: [
      'Rolleiflex 2.8F', 'Rolleiflex 2.8E', 'Rolleiflex 3.5F',
      'Rolleiflex T', 'Rolleiflex Automat',
      'Rolleicord V', 'Rolleicord Vb',
      '35', '35S', '35SE', '35T', '35TE',
      'SL35', 'SL35E', 'SL35M',
    ],
  },
  {
    brand: 'Fujifilm',
    models: [
      'GW690III', 'GSW690III', 'GW670III',
      'GA645', 'GA645Zi',
      'GF670',
      'Klasse', 'Klasse S', 'Klasse W',
      'Natura Classica', 'Natura S',
      'Tiara / DL Super Mini',
      'STX-2',
    ],
  },
  {
    brand: 'Konica',
    models: [
      'Autoreflex T3', 'Autoreflex TC',
      'FS-1', 'FT-1 Motor', 'FP-1',
      'C35', 'C35 AF', 'C35 EF',
      'Hexar', 'Hexar AF', 'Hexar RF',
      'Big Mini', 'Big Mini F',
    ],
  },
  {
    brand: 'Ricoh',
    models: [
      'GR1', 'GR1s', 'GR1v', 'GR10', 'GR21',
      'XR-7', 'XR-P', 'XR-500',
      'KR-5 Super', 'KR-10 Super',
      '500G', '500GX',
      'FF-1', 'FF-9s',
    ],
  },
  {
    brand: 'Polaroid',
    models: [
      'SX-70', 'SX-70 Sonar', 'SX-70 Alpha 1',
      'SLR 680', 'SLR 690',
      'Sun 600', 'Sun 660',
      'Spectra / Image',
      'OneStep', 'OneStep 2',
      'Land Camera 100', 'Land Camera 250', 'Land Camera 350',
    ],
  },
  {
    brand: 'Praktica',
    models: [
      'MTL 3', 'MTL 5', 'MTL 5B', 'MTL 50',
      'BCA', 'BC1', 'BMS',
      'LLC', 'LTL', 'LTL3', 'L', 'L2',
      'Super TL', 'Super TL1000',
    ],
  },
  {
    brand: 'Zenit',
    models: [
      'Zenit-E', 'Zenit-B', 'Zenit-EM', 'Zenit-S',
      'Zenit-ET', 'Zenit-TTL', 'Zenit-3M',
      'Zenit-11', 'Zenit-12', 'Zenit-12XP', 'Zenit-122', 'Zenit-122K',
      'Zenit-19', 'Zenit-212K', 'Zenit-312m',
      'Zenit-412', 'Zenit-KM', 'Zenit-AM', 'Zenit-Automat',
      'Horizon 202', 'Horizon Perfekt', 'Horizon S3 Pro',
    ],
  },
  {
    brand: 'Fed',
    models: [
      'Fed 1', 'Fed 2', 'Fed 3', 'Fed 4', 'Fed 5', 'Fed 5B',
      'Fed Atlas', 'Fed Micron', 'Fed Micron 2',
      'Fed 35', 'Fed 50',
    ],
  },
  {
    brand: 'Zorki',
    models: [
      'Zorki 1', 'Zorki 2', 'Zorki 3', 'Zorki 3M',
      'Zorki 4', 'Zorki 4K', 'Zorki 5', 'Zorki 6',
      'Zorki 10', 'Zorki 11', 'Zorki 12',
      'Mir',
    ],
  },
  {
    brand: 'Kiev',
    models: [
      'Kiev 4', 'Kiev 4A', 'Kiev 4AM',
      'Kiev 15', 'Kiev 17', 'Kiev 19', 'Kiev 19M', 'Kiev 20',
      'Kiev 60', 'Kiev 6C',
      'Kiev 88', 'Kiev 88CM',
      'Kiev 35A', 'Kiev Vega', 'Kiev Vega 2',
    ],
  },
  {
    brand: 'Smena',
    models: [
      'Smena 1', 'Smena 2', 'Smena 6',
      'Smena 8', 'Smena 8M', 'Smena 35',
      'Smena Symbol', 'Smena Rapid',
    ],
  },
  {
    brand: 'Lubitel',
    models: [
      'Lubitel 1', 'Lubitel 2', 'Lubitel 166',
      'Lubitel 166B', 'Lubitel 166+',
      'Lubitel Universal',
    ],
  },
  {
    brand: 'Chaika',
    models: [
      'Chaika', 'Chaika 2', 'Chaika 2M', 'Chaika 3',
    ],
  },
  {
    brand: 'Salyut / Kiev-88',
    models: [
      'Salyut', 'Salyut-S', 'Salyut-C',
      'Kiev 88', 'Kiev 88CM', 'Kiev 88TTL',
      'Arax 88', 'Arax 60',
    ],
  },
  {
    brand: 'Iskra',
    models: [
      'Iskra', 'Iskra 2',
    ],
  },
  {
    brand: 'Start',
    models: [
      'Start', 'Start 2',
    ],
  },
  {
    brand: 'Lomography',
    models: [
      'Lomo LC-A', 'Lomo LC-A+',
      'Diana F+', 'Diana Mini',
      'Holga 120N', 'Holga 120S',
      'La Sardina', 'Sprocket Rocket',
      'Konstruktor',
    ],
  },
  {
    brand: 'Bronica',
    models: [
      'SQ-A', 'SQ-Ai', 'SQ-B',
      'ETR', 'ETRSi', 'ETRS',
      'GS-1',
      'S2A', 'EC-TL',
    ],
  },
  {
    brand: 'Voigtländer',
    models: [
      'Bessa R', 'Bessa R2', 'Bessa R2A', 'Bessa R3A', 'Bessa R4A',
      'Bessa T', 'Bessa L',
      'Vito B', 'Vito II', 'Vitomatic',
      'Brillant',
    ],
  },
  {
    brand: 'Kodak',
    models: [
      'Retina IIIc', 'Retina Reflex',
      'Retinette', 'Retinette IA',
      'Instamatic', 'Instamatic 500',
      'Brownie', 'Brownie Hawkeye',
      'Signet 35',
      'Ektar H35',
    ],
  },
  {
    brand: 'Agfa',
    models: [
      'Isolette', 'Isolette III',
      'Optima', 'Optima 1035',
      'Silette', 'Silette Rapid',
      'Clack',
    ],
  },
];

// Get all brands (alphabetically sorted)
export const getAllBrands = (): string[] => analogCameras.map(c => c.brand).sort((a, b) => a.localeCompare(b));

// Get models by brand (alphabetically sorted)
export const getModelsByBrand = (brand: string): string[] => {
  const found = analogCameras.find(c => c.brand === brand);
  return found ? [...found.models].sort((a, b) => a.localeCompare(b)) : [];
};

// Total camera count
export const totalCameraCount = analogCameras.reduce((sum, b) => sum + b.models.length, 0);
