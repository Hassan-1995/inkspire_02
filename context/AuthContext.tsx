// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";

// export type User = {
//   id: number;
//   name: string;
//   email: string;
//   image?: string | null;
// };

// type AuthContextType = {
//   user: User | null;
//   token: string | null;
//   login: (user: User, token: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // Restore session from cookies on first load
//   useEffect(() => {
//     const savedUser = Cookies.get("user");
//     const savedToken = Cookies.get("token");

//     if (savedUser && savedToken) {
//       try {
//         setUser(JSON.parse(savedUser));
//         setToken(savedToken);
//       } catch (err) {
//         console.error("Failed to parse user cookie", err);
//         Cookies.remove("user");
//         Cookies.remove("token");
//       }
//     }
//   }, []);

//   // Save session to cookies
//   const login = (userData: User, jwtToken: string) => {
//     setUser(userData);
//     setToken(jwtToken);

//     Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // expires in 7 days
//     Cookies.set("token", jwtToken, { expires: 7 });
//   };

//   // Clear session
//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     Cookies.remove("user");
//     Cookies.remove("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to access auth state
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside an AuthProvider");
//   }
//   return context;
// };

// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import Cookies from "js-cookie";

// export type User = {
//   id: number;
//   name: string;
//   email: string;
//   image?: string | null;
// };

// type AuthContextType = {
//   user: User | null;
//   token: string | null;
//   login: (user: User, token: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // Restore session from cookies only once
//   useEffect(() => {
//     const savedUser = Cookies.get("user");
//     const savedToken = Cookies.get("token");

//     if (savedUser && savedToken) {
//       try {
//         setUser(JSON.parse(savedUser));
//         setToken(savedToken);
//       } catch (err) {
//         console.error("Failed to parse user cookie", err);
//         Cookies.remove("user");
//         Cookies.remove("token");
//       }
//     }
//   }, []);

//   // Stable login function
//   const login = useCallback((userData: User, jwtToken: string) => {
//     setUser(userData);
//     setToken(jwtToken);
//     Cookies.set("user", JSON.stringify(userData), { expires: 7 });
//     Cookies.set("token", jwtToken, { expires: 7 });
//   }, []);

//   // Stable logout function
//   const logout = useCallback(() => {
//     setUser(null);
//     setToken(null);
//     Cookies.remove("user");
//     Cookies.remove("token");
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside an AuthProviders");
//   }
//   return context;
// };

//
//
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";

export type User = {
  id: number;
  name: string;
  email: string;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  // Restore session from cookies only once
  useEffect(() => {
    const savedUser = Cookies.get("user");
    const savedToken = Cookies.get("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        setStatus("authenticated");
      } catch (err) {
        console.error("Failed to parse user cookie", err);
        Cookies.remove("user");
        Cookies.remove("token");
        setStatus("unauthenticated");
      }
    }
  }, []);

  // Stable login function
  const login = useCallback((userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    setStatus("authenticated");
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    Cookies.set("token", jwtToken, { expires: 7 });
  }, []);

  // Stable logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setStatus("unauthenticated");
    Cookies.remove("user");
    Cookies.remove("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProviders");
  }
  return context;
};
