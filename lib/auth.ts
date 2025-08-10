// lib/auth.ts
import api from "./api";


export type OrderedItems = {
  id?: number;
  orderID?: string | null;
  status?: "Pending" | "Confirmed" | "Delivered" | "Cancelled";
  payment?: "Card" | "Cash";
  paymentStatus?: "Paid" | "Unpaid" | "Refunded";
  deliveryDate?: string | null; // ISO date string e.g., "2025-08-10"

  userID: number;
  userEmail?: string | null;
  userContact?: string | null;
  userAddress?: string | null;

  productID: string;
  productName?: string | null;
  productPrice?: number | null;
  productColor?: string | null;
  productSize?: string | null;
  quantity?: number;
  primaryImageSize?: string | null;
  secondaryImageSize?: string | null;
  productFrontPath?: string | null;
  productBackPath?: string | null;
  uploadedImagePrimary?: string | null;
  uploadedImageSecondary?: string | null;

  created_at?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
}


export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await api.post("/user", data);
};

export const loginWithGoogle = async()=>{
    window.location.href = `http://localhost:5000/api/auth/google`;
};

// 
// update address and contanct information
export const updateUserContact = async (
  data: { address: string; contact: string },
  token: string
) => {
  return await api.put("/user-contact", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Check if user has provided delivery info
export const checkUserDeliveryInfo = async (token: string) => {
  try {
    const response = await api.get("/delivery-info/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.hasDeliveryInfo; // true or false
  } 
  
  catch(error){
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Error checking delivery info:", error);
    }
  }
  // catch (error: any) {
  //   console.error("Error checking delivery info:", error.response?.data || error.message);
  //   return false;
  // }
  
};
// get user address if exist
export const getUserContact = async (token: string) => {
  try {
    const response = await api.get("/user-contact", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { physicalAddress, contactNumber }
  } catch (error) {
    console.error("Failed to fetch user contact info", error);
    return null;
  }
};

// goes to payemnt gateway
export const initiateCheckout = async (amount: number) => {
  try {
    const response = await api.post("/checkout", { amount });
    return response.data; // { url: "https://..." }
  } 
  
  catch(error){
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Checkout API error:", error);
    }
  }
  // catch (error: any) {
  //   console.error("Checkout API error:", error.response?.data || error.message);
  //   throw error.response?.data || { error: "Unexpected error" };
  // }
};

// create order
export const createOrder = async (orderedItems: OrderedItems[], token: string) => {
  try {
    if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
      throw { error: "Invalid order data: must be a non-empty array" };
    }

    if (!token) {
      throw { error: "Unauthorized: No token found" };
    }

    const response = await api.post(
      "/orders/create",
      orderedItems, // Send array directly
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token from session
        },
      }
    );

    return response.data; // { message: "Orders saved successfully" }
  } 
  
  catch(error){
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Create Order API error:", error);
    }
  }
  // catch (error: any) {
  //   console.error(
  //     "Create Order API error:",
  //     error.response?.data || error.message
  //   );
  //   throw error.response?.data || { error: "Unexpected error" };
  // }
};

export const getOrdersByUserID = async (token: string) => {
  try {
    if (!token) {
      throw { error: "Unauthorized: No token found" };
    }

    const response = await api.get("/orders/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // should be the array of orders
  } 
  
  catch(error){
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Get Orders By User ID API error:", error);
    }
  }
  
};