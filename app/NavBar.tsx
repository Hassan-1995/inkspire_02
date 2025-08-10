"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPackageDuotone, PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { RiMenuFold3Line, RiMenuUnfold3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { getOrdersByUserID } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const [signOut, setSignOut] = useState(false);

  const { user, token, logout, status } = useAuth();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartHasItems = cartItems.length > 0;
  const [orderHasItems, setOrderHasItems] = useState<number | null>(null);

  const pathName = usePathname();
  const mainLinks = [
    { label: "Catalog", href: "/catalog" },
    { label: "Design", href: "/design" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserID(token!);
        setOrderHasItems(data.length); // could be 0 or more
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrderHasItems(null);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  // useEffect(() => {
  //   console.log("Session status:", status);
  //   console.log("Session data:", session);
  // }, [status, session]);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md bg-stone-50/80 border-b border-stone-200 ${
        (pathName === "/login" || pathName === "/register") && "hidden"
      }`}
    >
      {/* Top Navbar */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative h-14 w-14">
            {/* Glow behind image on group hover */}
            <div className="absolute inset-0 rounded-full bg-purple-600 opacity-0 group-hover:opacity-50 blur-xl z-0 transition duration-300" />
            <Image
              src="/mascots/mascot_thumbsUp.png"
              alt="Inkspire Mascot"
              fill
              className="object-contain rounded-full z-10"
            />
          </div>
          <span
            className={`text-2xl font-bold  transition-colors duration-300 group-hover:text-purple-600 ${
              pathName === "/" ? "text-purple-800" : "text-stone-900"
            }`}
          >
            InkSpire
          </span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          {mainLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`"text-stone-700" hover:text-pink-600 transition-colors ${
                  pathName === link.href && "text-purple-600"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {status === "loading" && (
            <div className="text-stone-700 animate-pulse">Loading...</div>
          )}
          {status === "unauthenticated" && (
            <Link
              href={"/login"}
              className="hidden md:flex w-full border-slate-200 border py-1 px-2.5 md:py-2 md:px-3.5 rounded-lg font-bold transition transform hover:scale-105 active:scale-95 shadow-xl text-pink-800"
            >
              Sign In
            </Link>
          )}
          {status === "authenticated" && (
            <button
              onClick={() => setSignOut(true)}
              className="hidden md:flex cursor-pointer"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={50}
                  height={50}
                  className="rounded-xl object-cover"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </div>
              )}
            </button>
          )}

          {/* orders */}
          <Link href={"/order"} className="hidden md:flex font-semibold">
            <div className="relative">
              <p className="flex flex-col items-end text-pink-600 text-xs ">
                <PiPackageDuotone className="text-3xl text-purple-700 transition transform hover:scale-110" />
                Orders
              </p>
              {orderHasItems !== null && orderHasItems > 0 && (
                <div className="absolute top-0 right-0 bg-red-600 w-3 h-3 rounded-full border border-white" />
              )}
            </div>
          </Link>
          {/* cart */}
          <Link href={"/cart"} className="hidden md:flex font-semibold">
            <div className="relative">
              <p className="flex flex-col items-end text-pink-600 text-xs ">
                <PiShoppingCartSimpleDuotone className="text-3xl text-purple-700 transition transform hover:scale-110" />
                Cart
              </p>
              {cartHasItems && (
                <div className="absolute top-0 right-0 bg-red-600 w-3 h-3 rounded-full border border-white" />
              )}
            </div>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setModal((prev) => !prev)}
          >
            {!modal ? (
              <RiMenuFold3Line className="font-bold text-3xl text-purple-600" />
            ) : (
              <RiMenuUnfold3Line className="font-bold text-3xl text-purple-600" />
            )}
          </button>
        </div>
      </div>

      {/* Modal set-up */}

      <div
        className={`absolute backdrop-blur-md bg-orange-50/90 w-full h-screen py-1 px-2.5 ${
          modal ? "-translate-x-screen" : "translate-x-full"
        } transform-all duration-700 `}
      >
        {/* Navigation Links */}
        <ul className="flex flex-col gap-2 mb-6 px-2">
          {mainLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} onClick={() => setModal((prev) => !prev)}>
                <span
                  className={`block w-full text-base font-semibold text-stone-700 px-3 py-2 rounded-md ${
                    pathName === link.href ? "text-purple-600" : ""
                  } `}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between px-2 gap-2">
          {status === "loading" && (
            <div className="text-stone-700 animate-pulse">Loading...</div>
          )}
          {/* Sign In Button */}
          {status === "unauthenticated" && (
            <Link
              href={"/login"}
              className="w-full text-center py-2 px-4 rounded-lg font-bold transition transform hover:scale-105 active:scale-95 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              Sign In
            </Link>
          )}
          {status === "authenticated" && (
            <button
              onClick={() => setSignOut(true)}
              className="flex-1 text-center bg-pink-600 text-white font-semibold rounded-lg py-2 px-4 hover:bg-purple-700 transition-colors"
            >
              {user?.name || "U"}
            </button>
          )}

          {/* Spacer */}
          <div className="w-3"></div>

          {/* Order Icon Button */}
          <Link
            href="/order"
            className="flex items-center justify-center text-purple-700 font-semibold border border-purple-300 rounded-lg py-2 px-4 hover:bg-purple-100 transition"
          >
            <div className="relative">
              <p className="flex flex-col items-end text-pink-600 text-xs ">
                <PiPackageDuotone className="text-2xl text-purple-700 transition transform hover:scale-110" />
              </p>
            </div>
          </Link>
          {/* Cart Icon Button */}
          <Link
            href="/cart"
            className="flex items-center justify-center text-purple-700 font-semibold border border-purple-300 rounded-lg py-2 px-4 hover:bg-purple-100 transition"
          >
            {/* <RiShoppingBag4Line className="text-2xl" /> */}
            <div className="relative">
              <p className="flex flex-col items-end text-pink-600 text-xs ">
                <PiShoppingCartSimpleDuotone className="text-2xl text-purple-700 transition transform hover:scale-110" />
              </p>
              {cartHasItems && (
                <div className="absolute top-0 right-0 bg-red-600 w-2 h-2 rounded-full border border-white" />
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Signout Setup */}
      {signOut && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center w-screen h-screen z-50">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full text-center space-y-5">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">
              Do you want to sign out?
            </h2>
            <div className="flex justify-center gap-4">
              {/* <Link
                href={"/api/auth/signout"}
                className="bg-rose-100 text-rose-600 px-5 py-2 rounded-lg hover:bg-rose-200 transition-colors duration-200"
              >
                Yes
              </Link> */}
              <button
                // href={"/api/auth/signout"}
                onClick={logout}
                className="bg-rose-100 text-rose-600 px-5 py-2 rounded-lg hover:bg-rose-200 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setSignOut(false)}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
