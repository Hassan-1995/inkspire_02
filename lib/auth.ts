// lib/auth.ts
import api from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await api.post("/user", data);
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
  } catch (error: any) {
    console.error("Error checking delivery info:", error.response?.data || error.message);
    return false;
  }
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
  } catch (error: any) {
    console.error("Checkout API error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Unexpected error" };
  }
};