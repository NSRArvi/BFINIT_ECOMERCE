import { useState } from "react";
import { Link, useParams } from "react-router";
import { Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import useBasePath from "@/hooks/useBasePath";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SignupForm({
  control,
  handleSubmit,
  setStep,
  setError,
}) {
  const { storeId } = useParams();
  const basePath = useBasePath();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/auth/register",
  });

  const onSubmit = (data) => {
    const payload = {
      store_id: parseInt(storeId),
      ...data,
    };
    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setStep("otp");
        }

        setError("email", { message: data?.message });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border w-full max-w-md rounded-none border p-8">
        <h1 className="text-foreground mb-1 text-xl font-semibold tracking-tight">
          Create account
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Sign up to start shopping.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="rounded-none"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-none"
                  aria-invalid={fieldState.invalid}
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup className="rounded-none">
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    className="rounded-none"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <InputGroupAddon
                    onClick={() => setShowPassword(!showPassword)}
                    align="inline-end"
                    className="cursor-pointer"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </InputGroupAddon>
                </InputGroup>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="phone">
                  Phone{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 555 123 4567"
                  className="rounded-none"
                  {...field}
                />
                <FieldError />
              </Field>
            )}
          />

          <Controller
            name="agreeToTerms"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-none"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-muted-foreground text-xs leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link
                      to={`${basePath}/support/terms-and-conditions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2"
                    >
                      Legal & Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      to={`${basePath}/support/privacy`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="bg-foreground text-background hover:bg-foreground/90 mt-2 w-full rounded-none"
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to={`${basePath}/login`}
            className="text-foreground underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
