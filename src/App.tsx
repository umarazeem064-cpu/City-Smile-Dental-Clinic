import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  Globe,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  X,
} from 'lucide-react';
import {
  CLINIC_HOURS,
  CLINIC_INFO,
  CURRENCY_CONFIG,
  CurrencyCode,
  formatFee,
  LanguageCode,
  PATIENT_REVIEWS,
  TIME_SLOTS,
  TREATMENTS,
  TreatmentCategory,
  UI_COPY,
} from './data/clinicData';
import { ClinicImage } from './components/ClinicImage';
import { BookingConfirmationModal, BookingSummary, PrivacyPolicyModal } from './components/Modals';

export default function App() {
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [preloaderFade, setPreloaderFade] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('all');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(TREATMENTS[0].id);

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[3]);
  const [painLevel, setPainLevel] = useState<'routine' | 'mild' | 'urgent'>('routine');
  const [formError, setFormError] = useState<string | null>(null);

  const [bookingModalData, setBookingModalData] = useState<BookingSummary | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const bookingSectionRef = useRef<HTMLElement | null>(null);

  const copy = UI_COPY[lang];
  const isRtl = lang === 'ur' || lang === 'ar';
  const todayIndex = useMemo(() => {
    // JS getDay(): 0=Sun..6=Sat -> map to CLINIC_HOURS index (0=Mon..6=Sun)
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPreloaderFade(true), 220);
    const t2 = window.setTimeout(() => setPreloaderVisible(false), 540);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isRtl, lang]);

  const filteredTreatments = useMemo(() => {
    if (activeCategory === 'all') return TREATMENTS;
    return TREATMENTS.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const handleBookTreatment = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setFormError(null);
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = patientName.trim();
    const trimmedPhone = patientPhone.trim();

    if (trimmedName.length < 2) {
      setFormError(
        lang === 'ur'
          ? 'براہ کرم مریض کا پورا نام درج کریں۔'
          : lang === 'ar'
            ? 'يرجى إدخال الاسم الكامل للمريض.'
            : 'Please enter the patient full name.'
      );
      return;
    }
    const digitsCount = trimmedPhone.replace(/\D/g, '').length;
    if (digitsCount < 7) {
      setFormError(
        lang === 'ur'
          ? 'براہ کرم درست فون یا واٹس ایپ نمبر درج کریں۔'
          : lang === 'ar'
            ? 'يرجى إدخال رقم هاتف أو واتساب صحيح.'
            : 'Please enter a valid phone or WhatsApp number (at least 7 digits).'
      );
      return;
    }

    setFormError(null);
    const chosenTreatment = TREATMENTS.find((t) => t.id === selectedTreatmentId) ?? TREATMENTS[0];
    const painText =
      painLevel === 'routine'
        ? copy.painRoutine
        : painLevel === 'mild'
          ? copy.painMild
          : copy.painUrgent;

    const refCode = `CS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingModalData({
      bookingRef: refCode,
      patientName: trimmedName,
      phone: trimmedPhone,
      treatmentTitle: chosenTreatment.title[lang],
      date: preferredDate,
      timeSlot: preferredSlot,
      painLevel: painText,
    });
  };

  const navLinks = [
    { href: '#home', label: copy.navHome },
    { href: '#treatments', label: copy.navTreatments },
    { href: '#dentists', label: copy.navDentists },
    { href: '#gallery', label: copy.navGallery },
    { href: '#reviews', label: copy.navReviews },
  ];

  const categories: { id: TreatmentCategory; label: string }[] = [
    { id: 'all', label: copy.filterAll },
    { id: 'preventive', label: copy.filterPreventive },
    { id: 'cosmetic', label: copy.filterCosmetic },
    { id: 'orthodontics', label: copy.filterOrthodontics },
    { id: 'restorative', label: copy.filterRestorative },
  ];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200"
    >
      {/* Preloader */}
      {preloaderVisible && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-300 ${
            preloaderFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 36 36"
              className="w-8 h-8 text-teal-700 dark:text-teal-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M11 8c-3.5 0-6 2.8-6 6.8 0 4.8 2.2 12.2 4.8 14.2 1.2.9 2.4-.2 3-2.5l1.2-4.6c.4-1.5 1.8-2.4 4-2.4s3.6.9 4 2.4l1.2 4.6c.6 2.3 1.8 3.4 3 2.5 2.6-2 4.8-9.4 4.8-14.2C31 10.8 28.5 8 25 8c-2.3 0-4.2 1.2-7 1.2S13.3 8 11 8z" />
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {CLINIC_INFO.name}
            </span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar — 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Title */}
          <a
            href="#home"
            className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
          >
            <svg
              viewBox="0 0 36 36"
              className="w-6 h-6 text-teal-700 dark:text-teal-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M11 8c-3.5 0-6 2.8-6 6.8 0 4.8 2.2 12.2 4.8 14.2 1.2.9 2.4-.2 3-2.5l1.2-4.6c.4-1.5 1.8-2.4 4-2.4s3.6.9 4 2.4l1.2 4.6c.6 2.3 1.8 3.4 3 2.5 2.6-2 4.8-9.4 4.8-14.2C31 10.8 28.5 8 25 8c-2.3 0-4.2 1.2-7 1.2S13.3 8 11 8z" />
            </svg>
            <span className="font-display">{CLINIC_INFO.name}</span>
          </a>

          {/* Zone 2: Concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#appointment"
              className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navBook}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero Utility Controls & Patient Action Strip */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
            {/* Quick Direct Contact */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <a
                href={CLINIC_INFO.telHref}
                className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                <span>{copy.callClinic}:</span>
                <span className="font-mono-tabular font-semibold" dir="ltr">
                  {CLINIC_INFO.phoneDisplay}
                </span>
              </a>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                |
              </span>
              <a
                href={CLINIC_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-teal-700 dark:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{copy.whatsappBtn}</span>
              </a>
            </div>

            {/* Global Controls: Language, Currency, Light/Dark */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Language Dropdown */}
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                <select
                  aria-label="Language"
                  value={lang}
                  onChange={(e) => setLang(e.target.value as LanguageCode)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="en">English</option>
                  <option value="ur">اردو</option>
                  <option value="ar">العربية</option>
                </select>
              </label>

              {/* Currency Switcher */}
              <div
                className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700"
                role="group"
                aria-label="Currency"
              >
                {(Object.keys(CURRENCY_CONFIG) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={`px-2 py-1 text-xs font-mono-tabular font-medium rounded transition-colors whitespace-nowrap ${
                      currency === code
                        ? 'bg-white dark:bg-slate-950 text-teal-700 dark:text-teal-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              {/* Light/Dark Theme Toggle */}
              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium transition-colors whitespace-nowrap"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 1: Hero Section */}
        <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-teal-700 dark:text-teal-400 tracking-wide mb-3">
                {copy.heroKicker}
              </p>
              <h1
                className="font-display font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.12] mb-5 text-balance"
                style={{ fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)' }}
              >
                {copy.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8">
                {copy.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{copy.heroPrimaryCta}</span>
                </a>
                <a
                  href={`${CLINIC_INFO.whatsappHref}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum ${CLINIC_INFO.name}, I would like to inquire about a dental appointment.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                  <span>{copy.heroSecondaryCta}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                <ClinicImage
                  src={CLINIC_INFO.heroImage}
                  alt="Modern bright operatory suite at City Smile Dental Clinic, Multan"
                  className="w-full h-full lg:h-full object-cover"
                  aspectClass="aspect-video lg:aspect-auto lg:h-full"
                />
              </div>
            </div>
          </div>

          {/* Full-width 4-Column Clinic Verification Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-b border-slate-200 dark:border-slate-800 py-5">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono-tabular">
                {copy.trustRating}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{copy.trustExp}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{copy.trustSterile}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{copy.trustHours}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Filterable Dental Treatments & Services Menu */}
        <section id="treatments" className="bg-white dark:bg-slate-900/50 border-t border-b border-slate-200 dark:border-slate-800 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3 text-balance">
                  {copy.treatmentsHeading}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {copy.treatmentsSub}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 self-start">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-white dark:bg-slate-950 text-teal-700 dark:text-teal-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreatments.map((treatment) => (
                <article
                  key={treatment.id}
                  className="flex flex-col rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <ClinicImage
                      src={treatment.image}
                      alt={treatment.title[lang]}
                      className="w-full h-full object-cover"
                      aspectClass="aspect-[4/3]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {/* Unboxed clean metadata with typographic separator */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-mono-tabular font-semibold text-teal-700 dark:text-teal-400">
                        {treatment.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{treatment.duration[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{treatment.protocol[lang]}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 mb-2.5">
                      {treatment.title[lang]}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">
                      {treatment.description[lang]}
                    </p>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">{copy.startingFrom}</span>
                        <span className="font-mono-tabular text-base font-bold text-slate-900 dark:text-slate-50" dir="ltr">
                          {formatFee(treatment.feePKR, currency)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBookTreatment(treatment.id)}
                        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-teal-700 dark:bg-slate-100 dark:hover:bg-teal-400 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                      >
                        {copy.bookThisTreatment}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Lead Dental Specialist & Sterilization Standards */}
        <section id="dentists" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Dentist Profile Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <ClinicImage
                    src={CLINIC_INFO.dentistImage}
                    alt={`${copy.doctorName} — ${CLINIC_INFO.name}`}
                    className="w-full h-full object-cover object-top"
                    aspectClass="aspect-[3/4]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-teal-700 dark:text-teal-400 mb-1">{copy.specialistHeading}</p>
                  <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1.5">
                    {copy.doctorName}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {copy.doctorQuals}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{copy.doctorExp}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{copy.doctorBio}</p>
                </div>
              </div>
            </div>

            {/* Clinical Safety & Sterilization Suite Column */}
            <div id="gallery" className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2 text-balance">
                  {copy.sterileHeading}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {copy.specialistSub}
                </p>
              </div>

              <div className="aspect-[4/3] max-h-[360px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                <ClinicImage
                  src={CLINIC_INFO.sterilizationImage}
                  alt="Class-B vacuum autoclave and sealed sterile dental pouches at City Smile Dental Clinic"
                  className="w-full h-full object-cover"
                  aspectClass="aspect-[4/3]"
                />
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {copy.sterilePoints.map((point, index) => (
                  <div key={point.title} className="p-5 sm:p-6 flex items-start gap-4">
                    <span className="font-mono-tabular text-sm font-bold text-teal-700 dark:text-teal-400 pt-0.5 shrink-0">
                      0{index + 1}.
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                        {point.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{point.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Verified Google Patient Reviews, Timings & Map */}
        <section
          id="reviews"
          className="bg-white dark:bg-slate-900/50 border-t border-b border-slate-200 dark:border-slate-800 py-16 lg:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-mono-tabular">
                    {CLINIC_INFO.rating} / 5.0 · {CLINIC_INFO.reviewCount} Google Reviews
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2 text-balance">
                  {copy.reviewsHeading}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{copy.reviewsSub}</p>
              </div>
              <a
                href={CLINIC_INFO.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors whitespace-nowrap self-start"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>{copy.viewGoogleReviews}</span>
              </a>
            </div>

            {/* Patient Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {PATIENT_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3" aria-label="5 out of 5 stars">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      “{review.quote[lang]}”
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                      <ClinicImage
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                        aspectClass="aspect-square"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{review.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {review.visitType[lang]} · {review.dateLabel}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Timings & Interactive Google Maps */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Weekly Schedule Table */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">
                    {copy.timingsHeading}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{copy.openDailyLabel}</p>

                  <div className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {CLINIC_HOURS.map((row, idx) => {
                      const isToday = idx === todayIndex;
                      return (
                        <div
                          key={row.day.en}
                          className={`py-2.5 flex items-center justify-between gap-4 ${
                            isToday ? 'text-teal-700 dark:text-teal-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>
                            {row.day[lang]}
                            {isToday && (
                              <span className="ms-2 text-xs font-medium">
                                · {lang === 'ur' ? 'آج' : lang === 'ar' ? 'اليوم' : 'Today'}
                              </span>
                            )}
                          </span>
                          <span className="font-mono-tabular text-xs sm:text-sm" dir="ltr">
                            {row.hours}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <MapPin className="w-4 h-4 text-teal-700 dark:text-teal-400 mt-0.5 shrink-0" />
                    <span>{CLINIC_INFO.address}</span>
                  </div>
                  <p className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400 ps-6" dir="ltr">
                    Plus Code: {CLINIC_INFO.plusCode} · {CLINIC_INFO.coordinates}
                  </p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex flex-col">
                <div className="relative flex-1 min-h-[300px]">
                  <iframe
                    title="City Smile Dental Clinic Multan Location Map"
                    src={CLINIC_INFO.mapsEmbedUrl}
                    className="w-full h-full min-h-[300px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{CLINIC_INFO.name}</span>
                    {' · '}
                    <span>{CLINIC_INFO.shortAddress}</span>
                  </div>
                  <a
                    href={CLINIC_INFO.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Navigation className="w-4 h-4 shrink-0" />
                    <span>{copy.directionsBtn}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Appointment Booking & WhatsApp Confirmation */}
        <section
          id="appointment"
          ref={bookingSectionRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3 text-balance">
                {copy.bookingHeading}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {copy.bookingSub}
              </p>

              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{copy.callClinic}</span>
                  <a
                    href={CLINIC_INFO.telHref}
                    className="font-mono-tabular text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-400"
                    dir="ltr"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">WhatsApp Desk</span>
                  <a
                    href={CLINIC_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline underline-offset-4"
                    dir="ltr"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{CLINIC_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                noValidate
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5"
              >
                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-sm text-rose-800 dark:text-rose-200 font-medium"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="patient-name"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {copy.labelName}
                    </label>
                    <input
                      id="patient-name"
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={copy.placeholderName}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="patient-phone"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {copy.labelPhone}
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      required
                      dir="ltr"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder={copy.placeholderPhone}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono-tabular text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="treatment-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    {copy.labelTreatment}
                  </label>
                  <select
                    id="treatment-select"
                    value={selectedTreatmentId}
                    onChange={(e) => setSelectedTreatmentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title[lang]} ({formatFee(t.feePKR, currency)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {copy.labelDate}
                    </label>
                    <input
                      id="preferred-date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono-tabular text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="preferred-slot"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {copy.labelSlot}
                    </label>
                    <select
                      id="preferred-slot"
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono-tabular text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {copy.labelPain}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(
                      [
                        { id: 'routine', label: copy.painRoutine },
                        { id: 'mild', label: copy.painMild },
                        { id: 'urgent', label: copy.painUrgent },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPainLevel(opt.id)}
                        className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors text-center ${
                          painLevel === opt.id
                            ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-600 dark:border-teal-400 text-teal-800 dark:text-teal-300'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold text-sm sm:text-base transition-colors"
                >
                  {copy.submitBooking}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-display text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                {CLINIC_INFO.name}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                {CLINIC_INFO.address}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a
                href={CLINIC_INFO.telHref}
                className="inline-flex items-center gap-1.5 font-mono-tabular font-medium text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>
              <a
                href={CLINIC_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-teal-700 dark:text-teal-400 hover:underline underline-offset-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{copy.whatsappBtn}</span>
              </a>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline underline-offset-4"
              >
                {copy.privacyLink}
              </button>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} {copy.footerRights}</p>
            <p>{copy.footerCredit}</p>
          </div>
        </div>
      </footer>

      <BookingConfirmationModal
        booking={bookingModalData}
        lang={lang}
        onClose={() => setBookingModalData(null)}
      />
      <PrivacyPolicyModal
        open={privacyOpen}
        lang={lang}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
}
