"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-600">Sign in to your admin account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-zinc-900 placeholder:text-zinc-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-zinc-900 placeholder:text-zinc-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <p className="text-center text-sm text-zinc-600">
              Need access?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-8">
          Protected by reCAPTCHA and subject to the Privacy Policy
        </p>
      </div>
    </div>
  );
}
