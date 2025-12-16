// src/components/auth/SignupForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextFieldWithIcon from "@/components/ui/TextFieldWithIcon";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { signup } from "@/lib/authApi";
import { handleApiError } from "@/lib/api/handleApiError";
import { useToast } from "@/components/ui/toast/useToast";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      companyName: formData.get("companyName") as string,
      password: formData.get("password") as string,
    };

    try {
      const result = await signup(payload);

      toast.success(result?.message ?? "Account created successfully");
      router.push("/login");
    } catch (err) {
      handleApiError(err, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-100 px-6 py-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Create account</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextFieldWithIcon
            label="First name"
            name="firstName"
            placeholder="First name"
            required
          />
          <TextFieldWithIcon
            label="Last name"
            name="lastName"
            placeholder="Last name"
            required
          />
        </div>

        <TextFieldWithIcon
          label="Email"
          name="email"
          type="email"
          placeholder="Work email"
          required
        />

        <TextFieldWithIcon
          label="Company"
          name="companyName"
          placeholder="Company name"
          required
        />

        <TextFieldWithIcon
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <PrimaryButton type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Create account"}
        </PrimaryButton>
      </form>
    </div>
  );
}
