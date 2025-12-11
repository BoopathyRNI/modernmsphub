// components/auth/LoginForm.tsx
import TextFieldWithIcon from "@/components/ui/TextFieldWithIcon";
import DividerWithText from "@/components/ui/DividerWithText";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function LoginForm() {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-100 px-6 py-6">
      {/* Email Field */}
      <TextFieldWithIcon
        label="Email"
        type="email"
        placeholder="Email"
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
              d="M16 12H8m8-4H8m8 8H8M5 8h14a2 2 0 012 
                 2v8a2 2 0 01-2 2H5a2 2 0 
                 01-2-2v-8a2 2 0 012-2z"
            />
          </svg>
        }
      />

      {/* Password Field */}
      <TextFieldWithIcon
        label="Password"
        type="password"
        placeholder="Password"
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
        rightIcon={
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
              d="M15 12a3 3 0 11-6 0 3 3 0 
                 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 
                 7.523 5 12 5c4.478 0 8.268 2.943 
                 9.542 7-1.274 4.057-5.064 
                 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        }
      />

      {/* Remember + Forgot */}
      <div className="mb-4 flex items-center justify-between text-[11px] text-slate-600">
        <label className="inline-flex items-center gap-1">
          <input type="checkbox" className="h-3 w-3" />
          <span>Remember me</span>
        </label>
        <button className="text-sky-600 hover:underline">
          Forgot Password?
        </button>
      </div>

      {/* Sign in button */}
      <PrimaryButton className="mb-4 w-full">
        Sign In
      </PrimaryButton>

      {/* Divider */}
      <DividerWithText text="Or sign in with" className="my-3" />

      {/* Social buttons */}
      <div className="flex gap-3 mb-3">
        <button className="flex-1 h-9 rounded border border-slate-300 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-50">
          Google
        </button>
        <button className="flex-1 h-9 rounded border border-slate-300 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-50">
          Microsoft
        </button>
      </div>

      {/* Sign up link */}
      <p className="text-[11px] text-slate-600 text-center">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-sky-600 font-semibold hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
