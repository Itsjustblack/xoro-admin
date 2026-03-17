import { AuthPanel } from "@/components/auth/auth-panel";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { XoroPayLogo } from "@/components/icons";

export default function SignUpPage() {
  return (
    <div className="h-screen grid grid-cols-2 w-full">
      <div className="bg-surface-1 h-full flex flex-col px-14 py-23">
        <div className="max-w-md w-full mx-auto">
          <XoroPayLogo />
          <div className="mt-10">
            <h1 className="font-secondary font-bold text-4xl text-text-primary leading-tight">
              Create your account
            </h1>
            <p className="text-text-secondary font-primary mt-2">
              Start your journey with the modern fintech standard.
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>

      <AuthPanel />
    </div>
  );
}
