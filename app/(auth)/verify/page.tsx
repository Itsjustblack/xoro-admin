import { AuthPanel } from "@/components/auth/auth-panel";
import { VerifyForm } from "@/components/auth/verify-form";
import { XoroPayLogo } from "@/components/icons";

type VerifyPageProps = {
  searchParams?: Promise<{ email?: string }>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const email = params?.email ?? "";

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 w-full">
      <div className="bg-surface-4 h-full flex flex-col justify-center px-6 sm:px-14 py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <XoroPayLogo />
          <div className="mt-10">
            <h1 className="font-secondary font-bold text-4xl text-text-primary leading-tight">
              Verify your account
            </h1>
          </div>
          <VerifyForm email={email} />
        </div>
      </div>

      <div className="hidden lg:block">
        <AuthPanel />
      </div>
    </div>
  );
}
