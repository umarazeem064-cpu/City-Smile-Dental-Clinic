import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface ClinicImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export function ClinicImage({ src, alt, className = '', aspectClass = '' }: ClinicImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-teal-50 dark:from-slate-800 dark:to-slate-900 text-slate-500 dark:text-slate-400 p-6 text-center ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <ShieldCheck className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2" strokeWidth={1.6} />
        <span className="text-xs font-medium max-w-[220px] leading-relaxed">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
