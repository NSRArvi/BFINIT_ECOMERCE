import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useLogin from "../hooks/useLogin";
import bfinitLogo from "@/assets/logo/bfinit.png";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { handleLogin, isPending } = useLogin();

  const handleTogglePassword = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const credentials = {
      email: form.email.value,
      password: form.password.value,
    };

    handleLogin(credentials);
  };

  return (
    <section className="font-inter flex min-h-screen flex-col justify-center bg-gray-50 py-10 md:py-0">
      <div className="mx-auto w-full max-w-md px-4">
        {/* Brand Identity Section */}
        <div className="mb-8 flex flex-col items-center">
          <img src={bfinitLogo} alt="Brand Logo" className="h-8" />
          <p className="mt-2 text-sm text-gray-600">Multivendor Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your vendor account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-transparent text-gray-400 hover:text-gray-500"
                >
                  {showPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className={`flex min-h-10 w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors ${
                !isPending
                  ? "cursor-pointer hover:bg-indigo-700"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              {isPending ? <Spinner /> : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <Link
                to="https://bfinit.com/terms-and-conditions"
                target="_blank"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="https://bfinit.com/privacy-policy"
                target="_blank"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            No account?{" "}
            <Link
              to="https://bfinit.com/bfinit-ecomerce-platform"
              target="_blanck"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Buy a Pack to start
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
