import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
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

interface CartState {
  items: CartItem[];
}

const loadFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cartData");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const saveToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartData", JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: loadFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.productID === action.payload.productID
      );

      if (existingIndex !== -1) {
        // Increment quantity if same productID
        state.items[existingIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productID !== action.payload
      );
      saveToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.productID === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
      saveToLocalStorage(state.items);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.productID === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.productID !== action.payload
        );
      }
      saveToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
