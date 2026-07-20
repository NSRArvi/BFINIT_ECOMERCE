import { useState } from "react";
import SignupForm from "../components/signup/SignupForm";
import OtpVerification from "../components/signup/OtpVerification";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/signupSchema";

export default function Signup() {
  const { control, handleSubmit, getValues, setError } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      agreeToTerms: false,
    },
  });
  const [step, setStep] = useState("register");

  return (
    <>
      {step === "register" ? (
        <SignupForm
          control={control}
          setError={setError}
          handleSubmit={handleSubmit}
          setStep={setStep}
        />
      ) : (
        <OtpVerification formValues={getValues()} />
      )}
    </>
  );
}
