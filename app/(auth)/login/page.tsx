import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div>
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-muted">No account? <Link href="/signup" className="text-accent">Sign up</Link></p>
      </div>
    </main>
  );
}
