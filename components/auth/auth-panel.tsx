import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export function AuthPanel() {
  return (
    <div className="h-full w-full relative overflow-hidden bg-brand-primary-dark px-14 py-29 flex flex-col">
      <div className="absolute top-1/2 -right-34 -translate-y-1/2 w-105 h-105 pointer-events-none">
        <Image
          height={340}
          width={340}
          src="/Border.png"
          alt="Decorative ring"
          className="object-fill opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-125">
        <div className="size-12 rounded-full text-surface-1 bg-surface-1/10 flex items-center justify-center border border-surface-1/20 mb-8">
          <ShieldCheck className="size-5" />
        </div>

        <h2 className="font-secondary text-surface-1 font-bold text-[2.25rem] leading-tight">
          Secure transactions at your fingertips.
        </h2>

        <p className="text-surface-8 mt-6 font-primary max-w-sm text-base leading-relaxed">
          Multi-layer encryption and real-time verification ensure your
          financial data stays exactly where it belongs. With you.
        </p>
      </div>

      <div className="relative mt-30 z-10 bg-surface-1/10 border border-surface-1/20 p-8 rounded-2xl w-full max-w-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image
              src="/group.png"
              alt="Trusted community avatars"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
          </div>

          <div>
            <p className="text-white font-semibold text-sm font-primary">
              Join our community
            </p>
            <p className="text-text-light text-xs font-primary mt-0.5">
              Trusted by over 12,000 businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
