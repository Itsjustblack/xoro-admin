import { AuthPanel } from "@/components/auth/auth-panel"
import { CreateMerchantForm } from "@/components/auth/create-merchant-form"
import { XoroPayLogo } from "@/components/icons"

export default function MerchantPage() {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 w-full">
      <div className="bg-surface-4 h-full flex flex-col px-4 sm:px-14 py-8 sm:py-10 overflow-y-auto">
        <div className="max-w-md w-full mt-20 mx-auto">
          <XoroPayLogo />
          <div className="mt-6 sm:mt-10">
            <h1 className="font-secondary font-bold text-2xl sm:text-4xl text-text-primary leading-tight">
              Welcome to XoroPay
            </h1>
            <p className="text-text-secondary font-primary mt-4">
              Create your merchant account to start accepting payments, managing
              transactions, and scaling your business.
            </p>
          </div>
          <CreateMerchantForm />
        </div>
      </div>

      <div className="hidden lg:block relative">
        <AuthPanel />
      </div>
    </div>
  )
}
