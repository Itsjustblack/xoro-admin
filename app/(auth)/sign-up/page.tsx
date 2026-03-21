import { AuthPanel } from "@/components/auth/auth-panel";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { XoroPayLogo } from "@/components/icons";

export default function SignUpPage() {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 w-full">
      <div className="bg-surface-1 h-full flex flex-col justify-center px-4 sm:px-14 pt-8 pb-15 lg:py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <XoroPayLogo />
          <div className="mt-6 sm:mt-10">
            <h1 className="font-secondary font-bold text-2xl sm:text-4xl text-text-primary leading-tight">
              Create your account
            </h1>
            <p className="text-text-secondary font-primary mt-1">
              Start your journey with the modern fintech standard.
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>

      <div className="hidden lg:block relative">
        <AuthPanel />
      </div>
    </div>
  );
}
