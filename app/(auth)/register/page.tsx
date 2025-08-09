"use client";
import { AxiosError } from "axios";
import { registerUser } from "@/lib/auth";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";

const colorTheme = "purple";

const themes = {
  green: {
    background: "bg-green-300",
    button: "bg-green-600",
    buttonHover: "hover:bg-green-700",
    text: "text-green-600",
  },
  purple: {
    background: "bg-purple-300",
    button: "bg-purple-600",
    buttonHover: "hover:bg-purple-700",
    text: "text-purple-600",
  },
};

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setLoading(true);
    try {
      const { name, email, password } = data;
      const res = await registerUser({ name, email, password });

      if (res.status === 201) {
        alert("Account created successfully!");
        reset(); // clear the form
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "Registration failed.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 -mt-22">
      <div className="w-full max-w-sm rounded-2xl shadow-xl bg-white/80 backdrop-blur-md px-8 py-10">
        <h1 className="text-2xl font-semibold text-slate-800 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-slate-600 mb-6 text-sm">
          Sign up using your email or Google
        </p>

        {/* Google Sign-In */}
        <div className="mb-6">
          <button
            className="cursor-pointer w-full flex items-center justify-center gap-3 h-12 bg-white text-slate-700 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500">
              or register with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">Name is required.</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">Email is required.</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">Password is required.</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message ||
                  "Confirm Password is required."}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full h-11 rounded-lg text-white font-semibold text-sm ${themes[colorTheme].button} ${themes[colorTheme].buttonHover} transition`}
          >
            {loading ? <h1 className="animate-pulse">Loading</h1> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className={`cursor-pointer font-semibold underline underline-offset-2 ${themes[colorTheme].text} hover:text-purple-800 transition`}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
