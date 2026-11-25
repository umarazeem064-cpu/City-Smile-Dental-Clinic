export type LanguageCode = 'en' | 'ur' | 'ar';
export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED';
export type TreatmentCategory = 'all' | 'preventive' | 'cosmetic' | 'orthodontics' | 'restorative';

export interface TreatmentItem {
  id: string;
  number: string;
  category: Exclude<TreatmentCategory, 'all'>;
  image: string;
  duration: Record<LanguageCode, string>;
  protocol: Record<LanguageCode, string>;
  feePKR: number;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
}

export interface PatientReview {
  id: string;
  name: string;
  visitType: Record<LanguageCode, string>;
  dateLabel: string;
  rating: number;
  avatar: string;
  quote: Record<LanguageCode, string>;
}

export interface ClinicHoursRow {
  day: Record<LanguageCode, string>;
  hours: string;
  isFriday?: boolean;
  isSunday?: boolean;
}

export const CLINIC_INFO = {
  name: 'City Smile Dental Clinic',
  city: 'Multan',
  country: 'Pakistan',
  address: 'MDA Chowk, Katchehry Road, opposite SHANGRILLA Bakery, Shadab Colony, Multan, 60700, Pakistan',
  shortAddress: 'MDA Chowk, Katchehry Rd, opp. Shangrilla Bakery, Shadab Colony, Multan',
  plusCode: '6F52+P9 Multan, Pakistan',
  phoneDisplay: '+92 300 8026262',
  phoneLocal: '0300 8026262',
  telHref: 'tel:+923008026262',
  whatsappNumber: '923008026262',
  whatsappHref: 'https://wa.me/923008026262',
  mapsShareUrl: 'https://maps.app.goo.gl/xnJnsc4qwD9zMeZW8',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=30.2093737,71.4508786&destination_place_id=ChIJZ7k-xuIzOzkRIGZK83zhrGo',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=City+Smile+Dental+Clinic,+MDA+Chowk,+Katchehry+Road,+Multan&ll=30.2093737,71.4508786&z=16&output=embed',
  rating: '4.9',
  reviewCount: 68,
  coordinates: '30.2094° N, 71.4509° E',
  heroImage: '/src/assets/images/hero_clinic_suite_1795602087947.jpg',
  dentistImage: '/src/assets/images/lead_dentist_saad_1795602089003.jpg',
  sterilizationImage: '/src/assets/images/sterilization_autoclave_1795602028815.jpg',
};

export const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { symbol: string; label: string; rateFromPKR: number; decimals: number }
> = {
  PKR: { symbol: '₨', label: 'PKR ₨', rateFromPKR: 1, decimals: 0 },
  USD: { symbol: '$', label: 'USD $', rateFromPKR: 1 / 278, decimals: 0 },
  GBP: { symbol: '£', label: 'GBP £', rateFromPKR: 1 / 352, decimals: 0 },
  AED: { symbol: 'د.إ', label: 'AED د.إ', rateFromPKR: 1 / 75.7, decimals: 0 },
};

export function formatFee(feePKR: number, currency: CurrencyCode): string {
  const cfg = CURRENCY_CONFIG[currency];
  const converted = Math.max(1, Math.round(feePKR * cfg.rateFromPKR));
  if (currency === 'PKR') {
    return `₨ ${converted.toLocaleString('en-US')}`;
  }
  if (currency === 'AED') {
    return `${converted.toLocaleString('en-US')} د.إ`;
  }
  return `${cfg.symbol}${converted.toLocaleString('en-US')}`;
}

export const CLINIC_HOURS: ClinicHoursRow[] = [
  {
    day: { en: 'Monday', ur: 'پیر', ar: 'الاثنين' },
    hours: '10:00 AM – 10:30 PM',
  },
  {
    day: { en: 'Tuesday', ur: 'منگل', ar: 'الثلاثاء' },
    hours: '10:00 AM – 10:30 PM',
  },
  {
    day: { en: 'Wednesday', ur: 'بدھ', ar: 'الأربعاء' },
    hours: '10:00 AM – 10:30 PM',
  },
  {
    day: { en: 'Thursday', ur: 'جمعرات', ar: 'الخميس' },
    hours: '10:00 AM – 10:30 PM',
  },
  {
    day: { en: 'Friday', ur: 'جمعہ', ar: 'الجمعة' },
    hours: '10:00 AM – 9:00 PM',
    isFriday: true,
  },
  {
    day: { en: 'Saturday', ur: 'ہفتہ', ar: 'السبت' },
    hours: '10:00 AM – 10:30 PM',
  },
  {
    day: { en: 'Sunday', ur: 'اتوار', ar: 'الأحد' },
    hours: '11:00 AM – 10:30 PM',
    isSunday: true,
  },
];

export const TREATMENTS: TreatmentItem[] = [
  {
    id: 'scaling-polishing',
    number: '01',
    category: 'preventive',
    image: '/src/assets/images/treatment_scaling_polishing_1795602027154.jpg',
    duration: { en: '35 mins', ur: '35 منٹ', ar: '35 دقيقة' },
    protocol: {
      en: 'Ultrasonic & Prophy Polish',
      ur: 'الٹراسونک صفائی',
      ar: 'تنظيف بالموجات فوق الصوتية',
    },
    feePKR: 4500,
    title: {
      en: 'Scaling & Polishing',
      ur: 'اسکیلنگ اور پالشنگ',
      ar: 'تنظيف وتلميع الأسنان',
    },
    description: {
      en: 'Gentle ultrasonic removal of hardened tartar, plaque buildup, and tea or coffee stains, finished with smooth enamel polishing for healthier gums.',
      ur: 'مسوڑھوں کی صحت اور چائے یا کافی کے داغ دور کرنے کے لیے جدید الٹراسونک اسکیلنگ اور نرم پالشنگ۔',
      ar: 'إزالة لطيفة للجير والبلاك وتصبغات القهوة والشاي بالموجات فوق الصوتية مع تلميع ناعم للمينا.',
    },
  },
  {
    id: 'teeth-whitening',
    number: '02',
    category: 'cosmetic',
    image: '/src/assets/images/treatment_teeth_whitening_1795602027077.jpg',
    duration: { en: '60 mins', ur: '60 منٹ', ar: '60 دقيقة' },
    protocol: {
      en: 'Enamel-Safe Desensitizing Gel',
      ur: 'حساسیت سے محفوظ جیل',
      ar: 'جل آمن لحساسية الأسنان',
    },
    feePKR: 18000,
    title: {
      en: 'Teeth Whitening & Smile Makeover',
      ur: 'ٹیتھ وائٹننگ اور اسمائل میک اوور',
      ar: 'تبييض الأسنان وتجميل الابتسامة',
    },
    description: {
      en: 'In-clinic clinical whitening and custom porcelain or composite smile design tailored to brighten natural shades without post-visit sensitivity.',
      ur: 'بغیر کسی جھنجھناہٹ کے قدرتی چمکدار مسکراہٹ کے لیے کلینیکل وائٹننگ اور کسٹم اسمائل ڈیزائن۔',
      ar: 'تبييض سريري وتصميم ابتسامة مخصص يبرز الإشراقة الطبيعية دون حساسية بعد الجلسة.',
    },
  },
  {
    id: 'braces-aligners',
    number: '03',
    category: 'orthodontics',
    image: '/src/assets/images/treatment_clear_aligners_1795602027067.jpg',
    duration: { en: '45 mins consult', ur: '45 منٹ مشورہ', ar: '45 دقيقة استشارة' },
    protocol: {
      en: 'Clear Aligners & Ceramic Braces',
      ur: 'کلیئر الائنرز اور بریسز',
      ar: 'قوالب شفافة وتقويم خزفي',
    },
    feePKR: 85000,
    title: {
      en: 'Braces & Clear Aligners',
      ur: 'بریسز اور کلیئر الائنرز',
      ar: 'التقويم المعدني والشفاف',
    },
    description: {
      en: 'Precision orthodontic alignment using discreet removable clear aligners, tooth-colored ceramic brackets, or classic self-ligating braces.',
      ur: 'دانتوں کی ترتیب درست کرنے کے لیے شفاف الائنرز، سیرامک بریسز اور جدید آرتھوڈونٹک علاج۔',
      ar: 'تقويم دقيق للأسنان باستخدام القوالب الشفافة القابلة للإزالة أو الحاصرات الخزفية والمعدنية.',
    },
  },
  {
    id: 'dental-implants',
    number: '04',
    category: 'restorative',
    image: '/src/assets/images/treatment_dental_implants_1795602027957.jpg',
    duration: { en: '60–90 mins', ur: '60–90 منٹ', ar: '60–90 دقيقة' },
    protocol: {
      en: 'Titanium & Zirconia Crown',
      ur: 'ٹائٹینیم اور زرکونیا کراؤن',
      ar: 'زرعة تيتانيوم وتاج زيركونيا',
    },
    feePKR: 75000,
    title: {
      en: 'Dental Implants & Crowns / Bridges',
      ur: 'ڈینٹل امپلانٹس اور کراؤنز',
      ar: 'زراعة الأسنان والتيجان والجسور',
    },
    description: {
      en: 'Permanent biocompatible titanium tooth replacements and lifelike zirconia crowns crafted to match your natural bite strength and shade.',
      ur: 'کھوئے ہوئے دانتوں کا مستقل متبادل اور قدرتی رنگ و مضبوطی سے ہم آہنگ زرکونیا کراؤن اور برج۔',
      ar: 'تعويض دائم للأسنان المفقودة بزراعات التيتانيوم وتيجان الزيركونيا المطابقة للون الطبيعي.',
    },
  },
  {
    id: 'root-canal',
    number: '05',
    category: 'restorative',
    image: '/src/assets/images/treatment_root_canal_1795602028822.jpg',
    duration: { en: '45 mins', ur: '45 منٹ', ar: '45 دقيقة' },
    protocol: {
      en: 'Rotary Endodontics · Digital X-Ray',
      ur: 'روٹری اینڈوڈونٹکس · ڈیجیٹل ایکس رے',
      ar: 'علاج جذور دوار · أشعة رقمية',
    },
    feePKR: 12000,
    title: {
      en: 'Painless Root Canal Treatment',
      ur: 'بے درد روٹ کینال علاج',
      ar: 'علاج الجذور بدون ألم',
    },
    description: {
      en: 'Single- or two-visit rotary root canal therapy using buffered painless local anesthesia and digital apex measurement to save natural teeth comfortably.',
      ur: 'مکمل بے درد اینستھیزیا اور ڈیجیٹل ایکس رے کی مدد سے قدرتی دانت کو بچانے کا آرام دہ روٹ کینال علاج۔',
      ar: 'علاج جذور مريح في جلسة أو جلستين بتخدير موضعي خالٍ من الألم وقياس رقمي دقيق.',
    },
  },
  {
    id: 'wisdom-pediatric',
    number: '06',
    category: 'preventive',
    image: '/src/assets/images/treatment_pediatric_care_1795602029316.jpg',
    duration: { en: '30–45 mins', ur: '30–45 منٹ', ar: '30–45 دقيقة' },
    protocol: {
      en: 'Atraumatic & Kid-Friendly Care',
      ur: 'بچوں اور بڑوں کے لیے نرم علاج',
      ar: 'رعاية لطيفة للأطفال والبالغين',
    },
    feePKR: 5000,
    title: {
      en: 'Wisdom Tooth & Pediatric Care',
      ur: 'عقل داڑھ اور بچوں کا دانتوں کا علاج',
      ar: 'ضرس العقل وطب أسنان الأطفال',
    },
    description: {
      en: 'Gentle, low-trauma wisdom tooth extractions for adults alongside calm, cavity-preventive dental checkups, fluoride varnish, and sealants for children.',
      ur: 'عقل داڑھ کی محفوظ سرجری اور بچوں کے لیے خوف سے پاک چیک اپ، فلورائیڈ اور سیلنٹس کی سہولت۔',
      ar: 'خلع لطيف لضرس العقل للبالغين وفحوصات وقائية هادئة وحشوات واقية للأطفال.',
    },
  },
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-1',
    name: 'Hamza Tariq',
    visitType: {
      en: 'Root Canal & Crown · Multan',
      ur: 'روٹ کینال اور کراؤن · ملتان',
      ar: 'علاج الجذور والتاج · ملتان',
    },
    dateLabel: 'Google Verified',
    rating: 5,
    avatar: '/src/assets/images/avatar_patient_1_1795602067238.jpg',
    quote: {
      en: 'Came in with severe molar pain near MDA Chowk. Dr. Muhammad Saad explained the digital X-ray clearly and completed the root canal with zero pain. Spotlessly clean clinic.',
      ur: 'ایم ڈی اے چوک کے قریب شدید دانت درد کے ساتھ آیا تھا۔ ڈاکٹر محمد سعد نے ڈیجیٹل ایکس رے دکھا کر تفصیل سمجھائی اور بغیر درد روٹ کینال مکمل کیا۔ کلینک نہایت صاف ستھرا ہے۔',
      ar: 'حضرت بألم شديد في الضرس. شرح الدكتور محمد سعد الأشعة بوضوح وأكمل علاج الجذور دون أي ألم في عيادة فائقة النظافة.',
    },
  },
  {
    id: 'rev-2',
    name: 'Ayesha Kamran',
    visitType: {
      en: 'Scaling & Whitening · Shadab Colony',
      ur: 'اسکیلنگ اور وائٹننگ · شاداب کالونی',
      ar: 'تنظيف وتبييض · شاداب كولوني',
    },
    dateLabel: 'Google Verified',
    rating: 5,
    avatar: '/src/assets/images/avatar_patient_2_1795602030953.jpg',
    quote: {
      en: 'Every instrument was opened from a sealed sterile pouch right in front of me. Staff is polite, evening hours fit my office schedule, and my smile looks natural and bright.',
      ur: 'ہر آلہ میرے سامنے سیل بند جراثیم سے پاک پیکٹ سے کھولا گیا۔ عملہ نہایت شائستہ ہے اور شام کے اوقات میری ملازمت کے لیے بہت موزوں ہیں۔',
      ar: 'تم فتح الأدوات المعقمة من عبوات محكمة أمامي مباشرة. الطاقم مهذب والمواعيد المسائية مناسبة جداً.',
    },
  },
  {
    id: 'rev-3',
    name: 'Tariq Mahmood',
    visitType: {
      en: 'Orthodontic Braces & Family Visit',
      ur: 'بریسز اور فیملی چیک اپ',
      ar: 'تقويم الأسنان وزيارة العائلة',
    },
    dateLabel: 'Google Verified',
    rating: 5,
    avatar: '/src/assets/images/avatar_patient_3_1795602031365.jpg',
    quote: {
      en: 'We bring our whole family to City Smile Dental Clinic opposite Shangrilla Bakery. Honest treatment guidance without unnecessary procedures, and very gentle with children.',
      ur: 'ہم پورا خاندان شنگریلا بیکری کے سامنے سٹی اسمائل ڈینٹل کلینک آتے ہیں۔ غیر ضروری علاج کے بغیر دیانتدارانہ مشورہ دیا جاتا ہے اور بچوں کے ساتھ رویہ بہت نرم ہے۔',
      ar: 'نزور العيادة مع جميع أفراد العائلة مقابل مخبز شنغريلا. استشارة صادقة دون إجراءات غير ضرورية وتعامل لطيف مع الأطفال.',
    },
  },
];

export const UI_COPY: Record<
  LanguageCode,
  {
    navHome: string;
    navTreatments: string;
    navDentists: string;
    navGallery: string;
    navReviews: string;
    navBook: string;
    callClinic: string;
    whatsappBtn: string;
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    trustRating: string;
    trustExp: string;
    trustSterile: string;
    trustHours: string;
    treatmentsHeading: string;
    treatmentsSub: string;
    filterAll: string;
    filterPreventive: string;
    filterCosmetic: string;
    filterOrthodontics: string;
    filterRestorative: string;
    startingFrom: string;
    bookThisTreatment: string;
    specialistHeading: string;
    specialistSub: string;
    doctorName: string;
    doctorQuals: string;
    doctorExp: string;
    doctorBio: string;
    sterileHeading: string;
    sterilePoints: { title: string; detail: string }[];
    reviewsHeading: string;
    reviewsSub: string;
    viewGoogleReviews: string;
    timingsHeading: string;
    openDailyLabel: string;
    directionsBtn: string;
    bookingHeading: string;
    bookingSub: string;
    labelName: string;
    placeholderName: string;
    labelPhone: string;
    placeholderPhone: string;
    labelTreatment: string;
    labelDate: string;
    labelSlot: string;
    labelPain: string;
    painRoutine: string;
    painMild: string;
    painUrgent: string;
    submitBooking: string;
    modalConfirmedTitle: string;
    modalConfirmedSub: string;
    sendWhatsAppBtn: string;
    closeBtn: string;
    privacyTitle: string;
    privacyLink: string;
    footerRights: string;
    footerCredit: string;
  }
> = {
  en: {
    navHome: 'Home',
    navTreatments: 'Treatments',
    navDentists: 'Our Dentists',
    navGallery: 'Sterilization',
    navReviews: 'Reviews',
    navBook: 'Book Visit',
    callClinic: 'Call Clinic',
    whatsappBtn: 'WhatsApp',
    heroKicker: 'MDA Chowk · Katchehry Road, Multan',
    heroTitle: 'Gentle, Painless Dental Care & Confident Smiles in Multan.',
    heroSubtitle:
      'Rated 4.9★ across 68 verified Google patient reviews. Modern digital diagnostics, 100% Class-B autoclave sterilization, and specialist care opposite Shangrilla Bakery.',
    heroPrimaryCta: 'Book Dental Appointment',
    heroSecondaryCta: 'Chat on WhatsApp',
    trustRating: '4.9 ★ · 68 Google Reviews',
    trustExp: '16+ Years Clinical Experience',
    trustSterile: '100% Autoclave Sterilized',
    trustHours: 'Open 7 Days · Until 10:30 PM',
    treatmentsHeading: 'Dental Treatments & Transparent Care',
    treatmentsSub:
      'Every procedure begins with a clear digital assessment and a calm, comfort-first approach. Starting fees convert live across currencies.',
    filterAll: 'All Treatments',
    filterPreventive: 'Preventive',
    filterCosmetic: 'Cosmetic',
    filterOrthodontics: 'Orthodontics',
    filterRestorative: 'Implants & RCT',
    startingFrom: 'Starting from',
    bookThisTreatment: 'Book This Treatment',
    specialistHeading: 'Meet Your Lead Dental Specialist',
    specialistSub: 'Evidence-based clinical precision paired with calm chairside reassurance.',
    doctorName: 'Dr. Muhammad Saad',
    doctorQuals: 'BDS, DOS, M.Phil (Public Health) · Certified LASER Dental Surgeon',
    doctorExp: '16+ Years Experience · Specialist in Orthodontics & Painless Restorative Care',
    doctorBio:
      'Dr. Muhammad Saad leads City Smile Dental Clinic in Multan with over sixteen years of hands-on surgical, orthodontic, and restorative experience. Known by families across Shadab Colony and Katchehry Road for unhurried consultations, transparent diagnoses, and painless local anesthesia.',
    sterileHeading: 'Clinical Safety & Sterilization Standards',
    sterilePoints: [
      {
        title: '100% Class-B Vacuum Autoclave',
        detail:
          'Every stainless instrument set is ultrasonically cleaned, sealed in individual indicator pouches, and heat-sterilized at 134°C before your eyes.',
      },
      {
        title: 'Painless Buffered Anesthesia',
        detail:
          'Topical numbing gel followed by slow, warm local anesthetic delivery ensures virtually zero sting during root canals or extractions.',
      },
      {
        title: 'Low-Dose Digital X-Ray Safety',
        detail:
          'Instant chairside digital sensors reduce radiation exposure by up to 80% while giving you a crystal-clear view of your tooth health.',
      },
    ],
    reviewsHeading: 'Verified Google Patient Reviews & Clinic Location',
    reviewsSub:
      'Trusted by Multan families for punctual evening and weekend hours, gentle care, and transparent pricing.',
    viewGoogleReviews: 'Read All 68 Reviews on Google Maps',
    timingsHeading: 'Weekly Consultation Hours',
    openDailyLabel: 'Open 7 Days · Walk-ins & Scheduled Visits',
    directionsBtn: 'Get Directions on Google Maps',
    bookingHeading: 'Book Your Dental Visit',
    bookingSub:
      'Reserve your preferred consultation slot online and send an instant confirmation directly to our clinic WhatsApp desk.',
    labelName: 'Patient Full Name',
    placeholderName: 'e.g. Ayesha Siddiqui',
    labelPhone: 'Phone / WhatsApp Number',
    placeholderPhone: 'e.g. 0300 1234567',
    labelTreatment: 'Select Dental Treatment',
    labelDate: 'Preferred Date',
    labelSlot: 'Preferred Time Slot',
    labelPain: 'Symptoms / Pain Level',
    painRoutine: 'Routine Checkup',
    painMild: 'Mild Discomfort',
    painUrgent: 'Urgent Toothache',
    submitBooking: 'Confirm Appointment',
    modalConfirmedTitle: 'Appointment Request Ready',
    modalConfirmedSub:
      'Your booking summary has been prepared. Tap below to send it directly to City Smile Dental Clinic on WhatsApp for instant slot confirmation.',
    sendWhatsAppBtn: 'Send Appointment on WhatsApp',
    closeBtn: 'Close',
    privacyTitle: 'Patient Privacy & Clinical Data Notice',
    privacyLink: 'Privacy Policy',
    footerRights: 'City Smile Dental Clinic, Multan. All rights reserved.',
    footerCredit: 'Patient Care Portal · MDA Chowk, Katchehry Road, Multan',
  },
  ur: {
    navHome: 'ہوم',
    navTreatments: 'علاج',
    navDentists: 'ڈاکٹرز',
    navGallery: 'اسٹیرلائزیشن',
    navReviews: 'ریویوز',
    navBook: 'اپائنٹمنٹ',
    callClinic: 'کال کریں',
    whatsappBtn: 'واٹس ایپ',
    heroKicker: 'ایم ڈی اے چوک · کچہری روڈ، ملتان',
    heroTitle: 'ملتان میں بے درد دانتوں کا علاج اور پراعتماد مسکراہٹ۔',
    heroSubtitle:
      'گوگل پر 68 تصدیق شدہ ریویوز کے ساتھ 4.9★ ریٹنگ۔ شنگریلا بیکری کے سامنے جدید ڈیجیٹل تشخیص، 100% آٹوکلیو اسٹیرلائزیشن اور ماہر ڈینٹل سرجن کی زیر نگرانی علاج۔',
    heroPrimaryCta: 'اپائنٹمنٹ بُک کریں',
    heroSecondaryCta: 'واٹس ایپ پر بات کریں',
    trustRating: '4.9 ★ · 68 گوگل ریویوز',
    trustExp: '16+ سالہ کلینیکل تجربہ',
    trustSterile: '100% آٹوکلیو جراثیم سے پاک',
    trustHours: 'ہفتے کے 7 دن کھلا · رات 10:30 تک',
    treatmentsHeading: 'دانتوں کے علاج اور شفاف فیس',
    treatmentsSub:
      'ہر علاج مکمل ڈیجیٹل معائنے اور آرام دہ ماحول میں کیا جاتا ہے۔ اپنی پسندیدہ کرنسی میں تخمینی فیس دیکھیں۔',
    filterAll: 'تمام علاج',
    filterPreventive: 'حفاظتی علاج',
    filterCosmetic: 'کاسمیٹک',
    filterOrthodontics: 'بریسز اور الائنرز',
    filterRestorative: 'امپلانٹس اور آر سی ٹی',
    startingFrom: 'ابتدائی فیس',
    bookThisTreatment: 'یہ علاج بُک کریں',
    specialistHeading: 'ہمارے ماہر ڈینٹل سرجن سے ملیں',
    specialistSub: 'جدید طبی مہارت اور مریضوں کے لیے پُرسکون توجہ۔',
    doctorName: 'ڈاکٹر محمد سعد',
    doctorQuals: 'BDS, DOS, M.Phil (Public Health) · سرٹیفائیڈ لیزر ڈینٹل سرجن',
    doctorExp: '16+ سالہ تجربہ · آرتھوڈونٹکس اور بے درد علاج کے ماہر',
    doctorBio:
      'ڈاکٹر محمد سعد سولہ سال سے زائد کلینیکل تجربے کے ساتھ سٹی اسمائل ڈینٹل کلینک ملتان کی قیادت کر رہے ہیں۔ ایم ڈی اے چوک اور شاداب کالونی کے خاندان ان کے نرم رویے، درست تشخیص اور بے درد علاج پر اعتماد کرتے ہیں۔',
    sterileHeading: 'کلینیکل حفاظت اور جراثیم کشی کے معیارات',
    sterilePoints: [
      {
        title: '100% کلاس-بی ویکیوم آٹوکلیو',
        detail:
          'ہر آلہ الٹراسونک صفائی کے بعد سیل بند پاؤچ میں 134°C پر جراثیم سے پاک کیا جاتا ہے اور آپ کے سامنے کھولا جاتا ہے۔',
      },
      {
        title: 'بے درد لوکل اینستھیزیا',
        detail:
          'نرم جیل اور جدید آرام دہ بے ہوشی کے طریقے سے روٹ کینال یا دانت نکلوانے کے دوران تکلیف محسوس نہیں ہوتی۔',
      },
      {
        title: 'کم تابکاری والا ڈیجیٹل ایکس رے',
        detail:
          'فوری ڈیجیٹل سینسر کے ذریعے 80% کم تابکاری کے ساتھ اسکرین پر واضح تشخیص دیکھیں۔',
      },
    ],
    reviewsHeading: 'گوگل مریضوں کے ریویوز اور کلینک کا مقام',
    reviewsSub:
      'شام اور اتوار کے اوقات، صفائی اور دیانتدارانہ مشورے کے باعث ملتان کے خاندانوں کا اعتماد۔',
    viewGoogleReviews: 'گوگل میپس پر تمام 68 ریویوز پڑھیں',
    timingsHeading: 'ہفتہ وار کلینک اوقات',
    openDailyLabel: 'ہفتے کے 7 دن کھلا · پیشگی بُکنگ اور واک ان',
    directionsBtn: 'گوگل میپس پر راستہ دیکھیں',
    bookingHeading: 'اپنا وزٹ بُک کریں',
    bookingSub:
      'اپنی سہولت کے مطابق تاریخ اور وقت منتخب کریں اور فوری تصدیق کے لیے کلینک کے واٹس ایپ پر بھیجیں۔',
    labelName: 'مریض کا پورا نام',
    placeholderName: 'مثال: عائشہ صدیقی',
    labelPhone: 'فون / واٹس ایپ نمبر',
    placeholderPhone: 'مثال: 0300 1234567',
    labelTreatment: 'علاج منتخب کریں',
    labelDate: 'پسندیدہ تاریخ',
    labelSlot: 'پسندیدہ وقت',
    labelPain: 'علامات / درد کی شدت',
    painRoutine: 'معمول کا چیک اپ',
    painMild: 'ہلکی تکلیف',
    painUrgent: 'شدید دانت درد',
    submitBooking: 'اپائنٹمنٹ کی تصدیق کریں',
    modalConfirmedTitle: 'اپائنٹمنٹ کی تفصیل تیار ہے',
    modalConfirmedSub:
      'فوری تصدیق کے لیے نیچے دیے گئے بٹن پر کلک کر کے اپنی معلومات کلینک کے واٹس ایپ پر بھیجیں۔',
    sendWhatsAppBtn: 'واٹس ایپ پر اپائنٹمنٹ بھیجیں',
    closeBtn: 'بند کریں',
    privacyTitle: 'مریضوں کی پرائیویسی پالیسی',
    privacyLink: 'پرائیویسی پالیسی',
    footerRights: 'سٹی اسمائل ڈینٹل کلینک، ملتان۔ جملہ حقوق محفوظ ہیں۔',
    footerCredit: 'ایم ڈی اے چوک، کچہری روڈ، ملتان',
  },
  ar: {
    navHome: 'الرئيسية',
    navTreatments: 'العلاجات',
    navDentists: 'الأطباء',
    navGallery: 'التعقيم',
    navReviews: 'التقييمات',
    navBook: 'احجز موعداً',
    callClinic: 'اتصل بالعيادة',
    whatsappBtn: 'واتساب',
    heroKicker: 'تقاطع MDA · طريق كاتشيري، ملتان',
    heroTitle: 'رعاية أسنان لطيفة بدون ألم وابتسامة واثقة في ملتان.',
    heroSubtitle:
      'تقييم 4.9★ من 68 مراجعة موثقة على جوجل. تشخيص رقمي حديث، تعقيم بالبخار فئة B بنسبة 100%، ورعاية متخصصة مقابل مخبز شنغريلا.',
    heroPrimaryCta: 'احجز موعد الأسنان',
    heroSecondaryCta: 'تواصل عبر واتساب',
    trustRating: '4.9 ★ · 68 تقييم جوجل',
    trustExp: 'أكثر من 16 عاماً خبرة',
    trustSterile: 'تعقيم أوتوكلاف 100%',
    trustHours: 'مفتوح 7 أيام · حتى 10:30 مساءً',
    treatmentsHeading: 'علاجات الأسنان والأسعار الشفافة',
    treatmentsSub:
      'يبدأ كل إجراء بفحص رقمي واضح ونهج هادئ يضع راحتك أولاً. تتحول الأسعار التقديرية فوراً حسب العملة المختارة.',
    filterAll: 'جميع العلاجات',
    filterPreventive: 'وقائي',
    filterCosmetic: 'تجميلي',
    filterOrthodontics: 'تقويم الأسنان',
    filterRestorative: 'زراعة وجذور',
    startingFrom: 'يبدأ من',
    bookThisTreatment: 'احجز هذا العلاج',
    specialistHeading: 'تعرف على استشاري طب الأسنان',
    specialistSub: 'دقة سريرية مبنية على الدليل العلمي مع عناية هادئة ومطمئنة.',
    doctorName: 'د. محمد سعد',
    doctorQuals: 'BDS, DOS, M.Phil (الصحة العامة) · جراح أسنان معتمد بالليزر',
    doctorExp: 'خبرة +16 عاماً · أخصائي التقويم والعلاج الترميمي بدون ألم',
    doctorBio:
      'يقود الدكتور محمد سعد عيادة سيتي سمايل لطب الأسنان في ملتان بخبرة تتجاوز ستة عشر عاماً في الجراحة والتقويم وعلاج الجذور، مع عناية دقيقة وتخدير موضعي خالٍ من الألم.',
    sterileHeading: 'معايير السلامة والتعقيم السريري',
    sterilePoints: [
      {
        title: 'تعقيم أوتوكلاف الفئة B بنسبة 100%',
        detail:
          'تُنظف جميع الأدوات بالموجات فوق الصوتية وتُغلف في عبوات معقمة عند درجة حرارة 134 مئوية وتُفتح أمامك مباشرة.',
      },
      {
        title: 'تخدير موضعي لطيف بدون ألم',
        detail:
          'استخدام جل مخدر موضعي متبوعاً بحقن بطيء ودافئ يضمن علاج الجذور والخلع بأقصى درجات الراحة.',
      },
      {
        title: 'أشعة رقمية منخفضة الجرعة',
        detail:
          'مستشعرات رقمية فورية تقلل التعرض للأشعة بنسبة تصل إلى 80% مع وضوح فوري لصحة أسنانك.',
      },
    ],
    reviewsHeading: 'تقييمات المرضى الموثقة وموقع العيادة',
    reviewsSub:
      'موثوق من عائلات ملتان بفضل المواعيد المسائية واليومية، التعقيم الصارم، والتشخيص الأمين.',
    viewGoogleReviews: 'اقرأ جميع التقييمات (68) على خرائط جوجل',
    timingsHeading: 'ساعات العمل الأسبوعية',
    openDailyLabel: 'مفتوح طوال الأسبوع · مواعيد واستقبال مباشر',
    directionsBtn: 'احصل على الاتجاهات عبر خرائط جوجل',
    bookingHeading: 'احجز زيارتك لطب الأسنان',
    bookingSub:
      'اختر الموعد المناسب وأرسل ملخص الحجز مباشرة إلى مكتب العيادة عبر واتساب لتأكيد فوري.',
    labelName: 'الاسم الكامل للمريض',
    placeholderName: 'مثال: عائشة صديقي',
    labelPhone: 'رقم الهاتف / واتساب',
    placeholderPhone: 'مثال: 0300 1234567',
    labelTreatment: 'اختر العلاج المطلوب',
    labelDate: 'التاريخ المفضل',
    labelSlot: 'الفترة الزمنية المفضلة',
    labelPain: 'الأعراض / مستوى الألم',
    painRoutine: 'فحص روتيني',
    painMild: 'انزعاج خفيف',
    painUrgent: 'ألم أسنان عاجل',
    submitBooking: 'تأكيد الموعد',
    modalConfirmedTitle: 'تفاصيل الموعد جاهزة',
    modalConfirmedSub:
      'تم تجهيز ملخص حجزك. اضغط أدناه لإرساله مباشرة إلى واتساب عيادة سيتي سمايل لتأكيد الموعد فوراً.',
    sendWhatsAppBtn: 'إرسال الموعد عبر واتساب',
    closeBtn: 'إغلاق',
    privacyTitle: 'سياسة خصوصية المرضى',
    privacyLink: 'سياسة الخصوصية',
    footerRights: 'عيادة سيتي سمايل لطب الأسنان، ملتان. جميع الحقوق محفوظة.',
    footerCredit: 'تقاطع MDA، طريق كاتشيري، ملتان',
  },
};

export const TIME_SLOTS = [
  '10:30 AM – 12:00 PM',
  '12:30 PM – 02:30 PM',
  '04:30 PM – 06:30 PM',
  '07:00 PM – 09:00 PM',
  '09:00 PM – 10:15 PM',
];
