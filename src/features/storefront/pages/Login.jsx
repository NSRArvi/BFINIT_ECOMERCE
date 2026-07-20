import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { loginSchema } from "../schemas/loginSchema";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import useBasePath from "@/hooks/useBasePath";
import useCustomerAuth from "../hooks/useCustomerAuth";

export default function Login() {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveAuthInfo } = useCustomerAuth();
  const basePath = useBasePath();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/auth/login",
  });

  const onSubmit = (data) => {
    const payload = { store_id: parseInt(storeId), ...data };
    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          const authInfo = {
            token: data.data.token,
            user: {
              id: data.data.data.user.id,
              name: data.data.data.user.name,
              email: data.data.data.user.email,
              phone: data.data.data.user.phone || null,
            },
          };

          saveAuthInfo(authInfo);
          navigate(searchParams.get("redirect") || `${basePath}/`);
          return;
        }
        setError("root", { message: "Invalid email or password" });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border w-full max-w-md rounded-none border p-8">
        <h1 className="text-foreground mb-1 text-xl font-semibold tracking-tight">
          Log in
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Welcome back. Enter your details to continue.
        </p>

        {errors.root && (
          <p className="text-destructive mb-4 text-sm" role="alert">
            {errors.root.message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-none"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup className="rounded-none">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    data-slot="input-group-control"
                    className="rounded-none border-0 shadow-none"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <div className="flex justify-end">
            <a
              href={`${basePath}/forgot-password`}
              className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-foreground text-background hover:bg-foreground/90 mt-2 w-full rounded-none"
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to={`${basePath}/signup`}
            className="text-foreground underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
