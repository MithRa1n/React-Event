import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormWrapper } from "../components/AuthFormWrapper";
import type { FormDataLogin } from "./Login";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormDataLogin>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataLogin) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <AuthFormWrapper
      title="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("email")} placeholder="Email" type="email" required />
        <Input {...register("password")} placeholder="Password" type="password" required />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      {error && <div className="mt-4 text-sm text-red-500 text-center">{error}</div>}
    </AuthFormWrapper>
  );
}
