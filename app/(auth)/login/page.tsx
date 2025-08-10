"use client";
import { loginWithGoogle } from "@/lib/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

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
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/"); // or wherever you want
    } else {
      alert("Invalid credentials");
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 -mt-22">
      <div className="w-full max-w-sm rounded-2xl shadow-xl bg-white/80 backdrop-blur-md px-8 py-10">
        <h1 className="text-2xl font-semibold text-slate-800 text-center mb-2">
          Welcome back
        </h1>
        <p className="text-center text-slate-600 mb-6 text-sm">
          Sign in to your account to continue
        </p>

        {/* Google Sign-In Button */}
        <div className="mb-6">
          <button
            // onClick={() =>
            //   signIn("google", {
            //     callbackUrl: "/",
            //   })
            // }

            onClick={loginWithGoogle}
            className="cursor-pointer w-full flex items-center justify-center gap-3 h-12 bg-white text-slate-700 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition"
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
              or sign in with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <button
            type="submit"
            className={`cursor-pointer  w-full h-11 rounded-lg text-white font-semibold text-sm ${themes[colorTheme].button} ${themes[colorTheme].buttonHover} transition`}
          >
            Sign In
          </button>
        </form>

        {/* Register Redirect */}
        <div className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href={"/register"}
            className={`cursor-pointer font-semibold underline underline-offset-2 ${themes[colorTheme].text} hover:text-purple-800 transition`}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
