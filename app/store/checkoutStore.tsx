// import { create } from "zustand";

// type CheckoutStore = {
//   amount: number | null;
//   setAmount: (amount: number) => void;
// };

// export const useCheckoutStore = create<CheckoutStore>((set) => ({
//   amount: null,
//   setAmount: (amount) => set({ amount }),
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CheckoutStore = {
  amount: number | null;
  setAmount: (amount: number) => void;
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      amount: null,
      setAmount: (amount) => set({ amount }),
    }),
    {
      name: "checkout-storage", // Key name in localStorage
    }
  )
);
