import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div>
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-muted">Already have an account? <Link href="/login" className="text-accent">Login</Link></p>
      </div>
    </main>
  );
}
