"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getUserContact, updateUserContact } from "@/lib/auth";

const formatContactNumber = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  return digits.length >= 4
    ? digits.slice(0, 4) + "-" + digits.slice(4, 11)
    : digits;
};

const DeliveryInformation = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  const token = useMemo(() => session?.user?.accessToken, [session]);
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getUserContact(token);
      setAddress(data?.physicalAddress ?? "");
      setContactNumber(data?.contactNumber ?? "");
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserInfo();
    }
  }, [status, fetchUserInfo]);

  const handleSave = async () => {
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    if (!/^03\d{2}-\d{7}$/.test(contactNumber)) {
      alert("Please enter a valid contact number in the format 03XX-XXXXXXX");
      return;
    }

    setLoading(true);
    try {
      await updateUserContact({ address, contact: contactNumber }, token);
      alert("Delivery information saved successfully!");
      router.push("/cart");
    } catch (error) {
      // catch (error: any) {
      //   console.error("Error saving delivery info:", error);
      //   alert(
      //     error?.response?.data?.message ||
      //       "Failed to save delivery information. Please try again."
      //   );
      // }
      // error is unknown, so narrow its type before using it
      if (error instanceof Error) {
        alert(`Error saving delivery info:: ${error.message}`);
      } else {
        alert(
          `Failed to save delivery information. Please try again: ${String(
            error
          )}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("Session Delivery-infio: ", session);

  return (
    <div className="w-full min-h-screen pb-20">
      <section className="mb-2 text-white py-5 text-center">
        <div className="flex justify-center items-end">
          <Image
            src="/mascots/mascot_leftIndex.png"
            alt="Inkspire Mascot"
            width={100}
            height={100}
          />
          <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            InkSpire
          </h1>
        </div>
        <p className="text-lg md:text-2xl text-amber-400">
          Please review and confirm your delivery information below.
        </p>
      </section>

      <section className="flex justify-center items-center">
        <div className="w-[80%] bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl shadow-2xl p-8 text-xs md:text-base">
          <div className="space-y-5">
            <h2 className="text-gray-700 flex justify-between">
              <strong>Name:</strong>
              {status !== "authenticated" ? (
                <p className="animate-pulse">Loading...</p>
              ) : (
                <p>{session?.user?.name}</p>
              )}
            </h2>
            <h2 className="text-gray-700 flex justify-between">
              <strong>Email:</strong>
              {status !== "authenticated" ? (
                <p className="animate-pulse">Loading...</p>
              ) : (
                <p>{session?.user?.email}</p>
              )}
            </h2>

            <div>
              <label className="block text-gray-700 mb-1">
                <strong>Delivery Address</strong>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete delivery address"
                rows={4}
                disabled={loading}
                className="w-full p-3 bg-white border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                <strong>Contact Number</strong>
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) =>
                  setContactNumber(formatContactNumber(e.target.value))
                }
                placeholder="03XX-XXXXXXX"
                disabled={loading}
                className="w-full p-3 bg-white border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={handleSave}
              className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:scale-105 active:scale-95 transition px-6 shadow-xl"
              disabled={loading || !address || !contactNumber}
            >
              {loading ? "Please Wait..." : "Save Information"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryInformation;
