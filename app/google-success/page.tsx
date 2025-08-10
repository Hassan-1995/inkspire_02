// // app/google-success/page.tsx  (App Router)
// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";

// export default function GoogleSuccessPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { login } = useAuth();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     const userParam = searchParams.get("user");

//     if (token && userParam) {
//       try {
//         const user = JSON.parse(decodeURIComponent(userParam));
//         login(user, token);
//         router.push("/"); // redirect to home
//       } catch (err) {
//         console.error("Invalid user data", err);
//       }
//     }
//   }, [searchParams, login, router]);

//   return <p>Logging you in...</p>;
// }

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function GoogleSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        login(user, token);
        router.push("/"); // Redirect to home or dashboard
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }
  }, [searchParams, login, router]);

  return <p>Logging you in...</p>;
}
