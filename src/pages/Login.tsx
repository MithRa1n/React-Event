import { useForm } from "react-hook-form";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormWrapper } from "@/components/AuthFormWrapper";

export type FormDataLogin = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormDataLogin>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataLogin) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
      title="Login"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLabel="Register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("email")} placeholder="Email" type="email" required />
        <Input {...register("password")} placeholder="Password" type="password" required />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      {error && <div className="mt-4 text-sm text-red-500 text-center">{error}</div>}
      <Button variant="outline" onClick={handleGoogleLogin} className="w-full mt-2">
        Login with Google
      </Button>
    </AuthFormWrapper>
  );
}
