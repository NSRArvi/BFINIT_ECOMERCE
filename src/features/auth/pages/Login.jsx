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
    <section className="font-inter bg-muted flex min-h-screen flex-col justify-center py-10 md:py-0">
      <div className="mx-auto w-full max-w-md px-4">
        {/* Brand Identity Section */}
        <div className="mb-8 flex flex-col items-center">
          <img src={bfinitLogo} alt="Brand Logo" className="h-8" />
          <p className="text-muted-foreground mt-2 text-sm">
            Multivendor Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="border-border bg-card text-card-foreground rounded-xl border p-8">
          <div className="mb-6 text-center">
            <h1 className="text-foreground text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Sign in to your vendor account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-foreground mb-1 block text-sm font-medium"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="border-input bg-background text-foreground placeholder:text-muted-foreground block w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-foreground mb-1 block text-sm font-medium"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary/80 text-xs font-medium"
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
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground block w-full rounded-lg border px-4 py-2.5 pr-10 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-transparent"
                >
                  {showPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className={`bg-primary text-primary-foreground flex min-h-10 w-full justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                !isPending
                  ? "hover:bg-primary/90 cursor-pointer"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              {isPending ? <Spinner /> : "Sign in"}
            </Button>
          </form>

          <div className="text-muted-foreground mt-6 text-center text-xs">
            <p>
              By continuing, you agree to our{" "}
              <Link
                to="https://bfinit.com/terms-and-conditions"
                target="_blank"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="https://bfinit.com/privacy-policy"
                target="_blank"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 text-center text-sm">
          <p>
            No account?{" "}
            <Link
              to="https://bfinit.com/bfinit-ecomerce-platform"
              target="_blank"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Buy a Pack to start
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
