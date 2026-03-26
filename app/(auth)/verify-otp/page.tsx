import { AuthPanel } from "@/components/auth/auth-panel"
import { VerifyForm } from "@/components/auth/verify-form"
import { XoroPayLogo } from "@/components/icons"

type VerifyPageProps = {
  searchParams?: Promise<{ email?: string }>
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams
  const email = params?.email ?? ""

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 w-full">
      <div className="flex h-full flex-col justify-center overflow-y-auto bg-surface-pane px-4 py-8 sm:px-14 sm:py-10">
        <div className="max-w-md w-full mx-auto">
          <XoroPayLogo />
          <div className="mt-6 sm:mt-10">
            <h1 className="font-secondary font-bold text-2xl sm:text-4xl text-text-primary leading-tight">
              Verify your account
            </h1>
          </div>
          <VerifyForm email={email} />
        </div>
      </div>

      <div className="hidden lg:block relative">
        <AuthPanel />
      </div>
    </div>
  )
}
