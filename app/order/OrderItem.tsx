"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmptyOrder from "./EmptyOrder";
import { getOrdersByUserID } from "@/lib/auth"; // <- import the helper

interface OrderItemType {
  productID: string;
  productName: string;
  productPrice: number;
  productColor: string;
  productSize: string;
  productFrontPath: string;
  productBackPath?: string;
  uploadedImagePrimary?: string;
  uploadedImageSecondary?: string;
  quantity: number;
  orderID: string;
  status: string;
  payment: string;
  paymentStatus: string;
  deliveryDate: string;
}

const OrderItem = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const token = session?.user.accessToken;

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     fetchOrders();
  //   } else if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status]);

  // const fetchOrders = async () => {
  //   try {
  //     const token = session?.user.accessToken;
  //     const data = await getOrdersByUserID(token!);
  //     setOrders(data || []);
  //   } catch (err) {
  //     console.error("Error fetching orders:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserID(token!);
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchOrders();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, token]);

  if (loading) return <p className="text-center">Loading your orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {orders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <>
          <div className="mb-10">
            <Header title="Your Orders" />
          </div>

          {orders.map((item) => (
            <div
              key={`${item.orderID}-${item.productID}`}
              className="flex w-full h-auto border-b border-zinc-300 pb-4 mb-4"
            >
              {/* Left: Images */}
              <div className="relative w-1/3 h-full">
                <div className="grid grid-cols-2 auto-rows-fr gap-2 w-full h-full">
                  {/* Front View */}
                  <div className="relative w-full aspect-square">
                    <Image
                      src={item.productFrontPath}
                      alt="Front View"
                      fill
                      className="object-contain rounded border border-zinc-300 shadow-sm"
                    />
                  </div>

                  {/* Front Design (conditional) */}
                  {item.uploadedImagePrimary && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={item.uploadedImagePrimary}
                        alt="Front Design"
                        fill
                        className="object-contain rounded border border-zinc-300 shadow-sm"
                      />
                    </div>
                  )}

                  {/* Back View (conditional) */}
                  {item.productBackPath && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={item.productBackPath}
                        alt="Back View"
                        fill
                        className="object-contain rounded border border-zinc-300 shadow-sm"
                      />
                    </div>
                  )}

                  {/* Back Design (conditional) */}
                  {item.uploadedImageSecondary && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={item.uploadedImageSecondary}
                        alt="Back Design"
                        fill
                        className="object-contain rounded border border-zinc-300 shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-2/3 pl-4 flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-base">{item.productName}</p>
                  <p className="text-sm">
                    Price: Rs {item.productPrice.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    Color:{" "}
                    {item.productColor.charAt(0).toUpperCase() +
                      item.productColor.slice(1)}
                  </p>
                  <p className="text-sm">Size: {item.productSize}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm">Order ID: {item.orderID}</p>
                  <p className="text-sm">Status: {item.status}</p>
                  <p className="text-sm">Payment: {item.payment}</p>
                  <p className="text-sm">
                    Payment Status: {item.paymentStatus}
                  </p>
                  <p className="text-sm">Delivery Date: {item.deliveryDate}</p>
                </div>

                <p className="text-sm font-semibold mt-1">
                  Total: Rs{" "}
                  {(item.productPrice * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderItem;
