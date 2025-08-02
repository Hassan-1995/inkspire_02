"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/slices/cartSlice";

type AddToCartProps = {
  productID: string;
  productName: string;
  productFrontPath: string;
  productBackPath: string | null;
  uploadedImagePrimary: string;
  uploadedImageSecondary: string | null;
  productColor: string;
  productSize: string;
  primaryImageSize: string;
  secondaryImageSize: string | null;
  productPrice: number;
  quantity: number;
};

const AddToCart = (props: AddToCartProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(props));
  };

  return (
    <Link
      href="/cart"
      onClick={handleAddToCart}
      className="text-white font-semibold bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors py-1 px-2.5 md:py-2 md:px-3.5"
    >
      Add To Cart
    </Link>
  );
};

export default AddToCart;
