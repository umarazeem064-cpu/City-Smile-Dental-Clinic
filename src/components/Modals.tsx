import { CheckCircle2, MessageCircle, Shield, X } from 'lucide-react';
import { CLINIC_INFO, LanguageCode, UI_COPY } from '../data/clinicData';

export interface BookingSummary {
  bookingRef: string;
  patientName: string;
  phone: string;
  treatmentTitle: string;
  date: string;
  timeSlot: string;
  painLevel: string;
}

interface BookingModalProps {
  booking: BookingSummary | null;
  lang: LanguageCode;
  onClose: () => void;
}

export function BookingConfirmationModal({ booking, lang, onClose }: BookingModalProps) {
  if (!booking) return null;
  const copy = UI_COPY[lang];
  const isRtl = lang === 'ur' || lang === 'ar';

  const whatsappMessage = [
    `Assalam-o-Alaikum ${CLINIC_INFO.name} (Multan),`,
    `I would like to confirm a dental appointment:`,
    `• Ref: ${booking.bookingRef}`,
    `• Patient: ${booking.patientName}`,
    `• Phone: ${booking.phone}`,
    `• Treatment: ${booking.treatmentTitle}`,
    `• Preferred Date: ${booking.date}`,
    `• Preferred Time: ${booking.timeSlot}`,
    `• Urgency / Symptoms: ${booking.painLevel}`,
  ].join('\n');

  const whatsappUrl = `${CLINIC_INFO.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="booking-modal-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {copy.modalConfirmedTitle}
              </h3>
              <p className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                Ref · {booking.bookingRef}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBtn}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          {copy.modalConfirmedSub}
        </p>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 divide-y divide-slate-200 dark:divide-slate-700/70 text-sm mb-6">
          <div className="flex justify-between gap-4 px-4 py-2.5">
            <span className="text-slate-500 dark:text-slate-400">{copy.labelName}</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-end">{booking.patientName}</span>
          </div>
          <div className="flex justify-between gap-4 px-4 py-2.5">
            <span className="text-slate-500 dark:text-slate-400">{copy.labelPhone}</span>
            <span className="font-mono-tabular font-medium text-slate-900 dark:text-slate-100" dir="ltr">
              {booking.phone}
            </span>
          </div>
          <div className="flex justify-between gap-4 px-4 py-2.5">
            <span className="text-slate-500 dark:text-slate-400">{copy.labelTreatment}</span>
            <span className="font-medium text-teal-700 dark:text-teal-400 text-end">{booking.treatmentTitle}</span>
          </div>
          <div className="flex justify-between gap-4 px-4 py-2.5">
            <span className="text-slate-500 dark:text-slate-400">{copy.labelDate}</span>
            <span className="font-mono-tabular text-slate-900 dark:text-slate-100" dir="ltr">
              {booking.date} · {booking.timeSlot}
            </span>
          </div>
          <div className="flex justify-between gap-4 px-4 py-2.5">
            <span className="text-slate-500 dark:text-slate-400">{copy.labelPain}</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{booking.painLevel}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{copy.sendWhatsAppBtn}</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors whitespace-nowrap"
          >
            {copy.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

interface PrivacyModalProps {
  open: boolean;
  lang: LanguageCode;
  onClose: () => void;
}

export function PrivacyPolicyModal({ open, lang, onClose }: PrivacyModalProps) {
  if (!open) return null;
  const copy = UI_COPY[lang];
  const isRtl = lang === 'ur' || lang === 'ar';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h3 id="privacy-modal-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {copy.privacyTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBtn}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>{CLINIC_INFO.name}</strong> ({CLINIC_INFO.address}) respects patient confidentiality. Information
            entered into our appointment booking form is processed locally in your browser solely to prepare your
            appointment confirmation and optional WhatsApp message to our clinic reception desk (
            <span className="font-mono-tabular" dir="ltr">
              {CLINIC_INFO.phoneDisplay}
            </span>
            ).
          </p>
          <p>
            We do not sell, rent, or share patient phone numbers, symptom notes, or clinical inquiry details with
            third-party advertisers. Digital X-rays and treatment records at the clinic are maintained strictly under
            medical confidentiality protocols.
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {copy.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
