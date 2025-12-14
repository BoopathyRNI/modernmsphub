"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextFieldWithIcon from "@/components/ui/TextFieldWithIcon";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { signup } from "../../lib/authApi"; // comment : check the directory dots

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
      alert(result.message);
       // ✅ Redirect to login after successful signup
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-100 px-6 py-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Create account</h2>

      <form onSubmit={handleSubmit}>
        {/* First & Last name */}
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

        {/* Email */}
        <TextFieldWithIcon
          label="Email"
          name="email"
          type="email"
          placeholder="Work email"
          required
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8-4H8m8 8H8M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
              />
            </svg>
          }
        />

        {/* Company */}
        <TextFieldWithIcon
          label="Company"
          name="companyName"
          placeholder="Company name"
          required
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          }
        />

        {/* Password */}
        <TextFieldWithIcon
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          required
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c-1.105 0-2 .895-2 2v3h4v-3c0-1.105-.895-2-2-2zm6 
                   2v6H6v-6a6 6 0 0112 0zM9 7a3 3 0 116 0v4H9V7z"
              />
            </svg>
          }
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <PrimaryButton type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Create account"}
        </PrimaryButton>
      </form>
    </div>
  );
}
