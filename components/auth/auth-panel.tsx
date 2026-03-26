import { ShieldCheck } from "lucide-react"
import Image from "next/image"

export function AuthPanel() {
  return (
    <div className="h-full w-full relative overflow-hidden bg-brand-primary-dark px-14 py-29 flex flex-col text-white">
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
        <div className="mb-8 flex size-12 items-center justify-center rounded-full border border-surface-1/20 bg-surface-1/10 text-surface-1">
          <ShieldCheck className="size-5" />
        </div>

        <h2 className="font-secondary text-[2.25rem] leading-tight font-bold text-surface-1">
          Secure transactions at your fingertips.
        </h2>

        <p className="mt-6 max-w-sm font-primary text-base leading-relaxed text-surface-8">
          Multi-layer encryption and real-time verification ensure your
          financial data stays exactly where it belongs. With you.
        </p>
      </div>

      <div className="relative z-10 mt-30 w-full max-w-sm rounded-2xl border border-surface-1/20 bg-surface-1/10 p-8">
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
  )
}
