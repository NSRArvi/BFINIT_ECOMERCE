import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import { cn } from "@/lib/utils";
import useBasePath from "@/hooks/useBasePath";
import useCustomerAuth from "../../hooks/useCustomerAuth";

const RESEND_SECONDS = 60;

export default function OtpVerification({ formValues }) {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveAuthInfo } = useCustomerAuth();
  const basePath = useBasePath();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);

  const { mutate: verifyOtp, isPending: isVerifying } = usePostMutation({
    endpoint: "/api/v1/auth/register",
  });

  const { mutate: resendOtp, isPending: isResending } = usePostMutation({
    endpoint: "/storefront/auth/resend-otp",
  });

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Enter the 6-digit code");
      return;
    }
    setError("");

    verifyOtp(
      { otp_code: otp, store_id: parseInt(storeId), ...formValues },
      {
        onSuccess: (data) => {
          if (data?.success) {
            const authInfo = {
              token: data.data.token,
              user: {
                id: data.data.user.id,
                name: data.data.user.name,
                email: data.data.user.email,
                phone: data.data.user.phone || null,
              },
            };
            saveAuthInfo(authInfo);
            navigate(searchParams.get("redirect") || `${basePath}/`);
            return;
          }
          setError("Invalid code, try again");
        },
        onError: (err) => {
          setError(err?.message || "Invalid code, try again");
        },
      },
    );
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    resendOtp(
      { otp_code: otp, store_id: parseInt(storeId), ...formValues },
      {
        onSuccess: () => {
          setOtp("");
          setError("");
          setResendTimer(RESEND_SECONDS);
        },
      },
    );
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border w-full max-w-md rounded-none border p-8">
        <h1 className="text-foreground mb-1 text-xl font-semibold tracking-tight">
          Verify your email
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          We sent a 6-digit code to{" "}
          <span className="text-foreground font-medium">
            {formValues.email}
          </span>
        </p>

        <div className="flex flex-col items-center gap-4">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup
              className={cn("gap-2", !!error && "text-destructive")}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  aria-invalid={!!error}
                  className="border-input data-[active=true]:border-primary data-[active=true]:ring-primary/20 h-12 w-12 rounded-none border first:rounded-none last:rounded-none data-[active=true]:ring-1"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="text-destructive text-xs">{error}</p>}

          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="bg-foreground text-background hover:bg-foreground/90 w-full rounded-none"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>

          <p className="text-muted-foreground text-xs">
            Didn't get the code?{" "}
            {resendTimer > 0 ? (
              <span>Resend in {resendTimer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-foreground underline underline-offset-2 disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend code"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
