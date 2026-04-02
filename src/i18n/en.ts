import { Translations } from './tr';

const en: Translations = {
  nav: {
    home: 'Home',
    services: 'Services',
    gallery: 'Film Gallery',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    admin: 'Admin',
  },

  hero: {
    badge: 'Since 1969',
    title: "Istanbul's Photography Hub",
    subtitle: 'Passport Photos • Film Development • Printing • Souvenirs',
    description: "In the heart of Sirkeci, defying the speed of the digital world. We process every frame with care.",
    cta: 'Contact via WhatsApp',
    ctaSecondary: 'Explore Our Services',
    filmGallery: 'View My Films',
  },

  services: {
    title: 'Our Services',
    subtitle: 'Professional photography services',
    passport: {
      title: 'Passport Photos',
      description: 'Biometric-compatible professional passport photos valid for all official applications. Ready in 5 minutes.',
      features: ['Biometric compatible', 'All country standards', 'Ready in 5 minutes', 'Digital copy included'],
    },
    film: {
      title: 'Film Development & Scanning',
      description: 'We professionally develop and high-resolution scan your 35mm, 120 format, and disposable camera films.',
      features: ['35mm & 120 format', 'Color & B&W', 'High-resolution scanning', 'Digital delivery'],
    },
    print: {
      title: 'Photo Printing',
      description: 'We print your photos in the highest quality with our professional Epson equipment. Any size, any format.',
      features: ['Professional Epson D700', 'All sizes available', 'Canvas & poster', 'Same-day delivery'],
    },
    sublimation: {
      title: 'Customizable Products',
      description: 'Custom mugs, magnets, puzzles and more. Perfect for Istanbul souvenirs or special gifts.',
      features: ['Custom mugs', 'Magnets & keychains', 'Puzzles', 'Corporate gifts'],
    },
    studio: {
      title: 'Studio Photography',
      description: 'We shoot ID photos, biometrics, portraits and special occasions in our professional studio environment.',
      features: ['Professional Lighting', 'Portrait Photography', 'Corporate Shoots', 'Instant Delivery'],
    },
    equipment: {
      title: 'Photo & Camera Equipment',
      description: 'Analog and digital camera equipment, batteries, films and accessories are waiting for you in our store.',
      features: ['Camera Batteries', 'Analog Films', 'Memory Cards', 'Bags and Accessories'],
    },
  },

  products: {
    title: 'Our Products',
    subtitle: 'Analog photography and personal keepsakes',
    addToCart: 'Add to Cart',
    orderWhatsApp: 'Order via WhatsApp',
    customProduct: 'Customizable',
    viewAll: 'View All Products',
    currency: '₺',
    mainCategories: {
      'photo-supplies': {
        title: 'Photo Supplies',
        description: 'Analog film and photography accessories',
        icon: '🎞️',
      },
      'disposable-cameras': {
        title: 'Disposable Cameras',
        description: 'Single-use cameras',
        icon: '📷',
      },
      'customizable-products': {
        title: 'Customizable Products',
        description: 'Personalized souvenir products with your photo',
        icon: '🎁',
      },
    },
    subCategories: {
      '35mm-color': '35mm Color Film',
      '35mm-bw': '35mm Black & White Film',
      '120mm-color': '120mm Color Film',
      '120mm-bw': '120mm Black & White Film',
      'disposable': 'Disposable Cameras',
      'mug': 'Mugs',
      'magnet': 'Magnets',
      'puzzle': 'Puzzles',
      'keychain': 'Keychains',
      'frame': 'Frames',
      'print': 'Prints',
    },
    filmFormats: {
      '35mm': '35mm Film',
      '120mm': '120mm Roll Film',
    },
    filmTypes: {
      color: 'Color',
      bw: 'Black & White',
    },
    cart: {
      title: 'My Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Complete Order',
      remove: 'Remove',
      itemCount: 'items',
    },
  },

  gallery: {
    title: 'Film Gallery',
    subtitle: 'Download your developed films',
    phonePlaceholder: 'Your phone number',
    codePlaceholder: 'Your access code',
    submit: 'Show My Photos',
    downloadAll: 'Download All',
    download: 'Download',
    photos: 'photos',
    orderInfo: 'Order Information',
    filmType: 'Film Type',
    status: 'Status',
    date: 'Date',
    error: 'Phone number or access code is incorrect.',
    noPhotos: 'No photos uploaded yet.',
    statuses: {
      processing: 'Processing',
      ready: 'Ready',
      delivered: 'Delivered',
    },
    messages: {
      success: 'Photos loaded!',
    },
  },

  about: {
    title: 'About Us',
    subtitle: 'Our Story',
    story: {
      title: "Istanbul's Photography Hub Since 1969",
      p1: "In the heart of Sirkeci, there's a place that defies the speed of the digital world. Faruk Photography is one of Istanbul's most established photo studios with over half a century of experience.",
      p2: "We believe that a photograph is not just an image, but a memory, a feeling, a keepsake. From analog film to digital printing, we process every frame with care.",
      p3: "Today, alongside traditional photography services, we offer our customers a unique experience with modern sublimation technology and digital solutions.",
    },
    stats: {
      years: 'Years of Experience',
      customers: 'Happy Customers',
      films: 'Films Developed',
      photos: 'Photos Taken',
    },
  },

  contact: {
    title: 'Contact',
    subtitle: 'Get in touch',
    form: {
      name: 'Your Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Your Message',
      send: 'Send',
      sending: 'Sending...',
      success: 'Your message has been sent successfully!',
      error: 'An error occurred. Please try again.',
    },
    info: {
      address: 'Address',
      addressValue: 'Hobyar, Ankara Cd. No:55/A, 34112 Fatih/Istanbul',
      phone: 'Phone',
      phoneValue: '+90 532 440 29 57',
      hours: 'Working Hours',
      hoursValue: 'Monday - Saturday: 09:00 - 19:00',
      hoursClosed: 'Sunday: Closed',
      whatsapp: 'WhatsApp',
    },
    map: {
      directions: 'Get Directions',
    },
  },

  footer: {
    description: "In the heart of Sirkeci, Istanbul's photography hub since 1969.",
    quickLinks: 'Quick Links',
    services: 'Services',
    contact: 'Contact',
    newsletter: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Stay updated with promotions and news',
      placeholder: 'Your email address',
      subscribe: 'Subscribe',
      success: 'You have subscribed to our newsletter!',
    },
    copyright: '© 2026 Faruk Photography. All rights reserved.',
  },

  common: {
    learnMore: 'Learn More',
    viewDetails: 'Details',
    loading: 'Loading...',
    startingFrom: 'starting from',
    whatsappDefault: 'Hello, I am reaching out from your website.',
  },

  whyUs: {
    title: 'Why Faruk Photography?',
    subtitle: 'Discover our difference',
    items: {
      experience: {
        title: '55+ Years of Experience',
        description: "Istanbul's trusted photography address since 1969",
      },
      location: {
        title: 'Central Location',
        description: '3-minute walk from Sirkeci tram station',
      },
      express: {
        title: 'Express Service',
        description: 'Passport photos in 5 minutes, film same-day delivery',
      },
      digital: {
        title: 'Digital Delivery',
        description: 'Your films in digital format, accessible anytime',
      },
    },
  },
};

export default en;
