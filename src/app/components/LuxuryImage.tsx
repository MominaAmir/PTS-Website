// components/LuxuryImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface LuxuryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function LuxuryImage({ 
  src, alt, width, height, className = '' 
}: LuxuryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          transition-all duration-700
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={85}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-amber-500/10 animate-pulse" />
      )}
    </div>
  );
}