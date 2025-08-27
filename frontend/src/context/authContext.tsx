import React, { createContext, useEffect, useState } from "react";
import type { ILoginResponseData } from "../interfaces/response/login";
import common from "../utils/common";

type AuthContextPayload = {
  auth: ILoginResponseData | null;
  setAuth: (val: ILoginResponseData | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextPayload>({
  auth: null,
  setAuth: function (_: ILoginResponseData | null): void {
    throw new Error("Function not implemented.");
  },
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<ILoginResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth) {
      common.setCookie("blog_user", JSON.stringify(auth));
    } else {
      const savedAuth = common.getCookie("blog_user");
      if (savedAuth) {
        setAuth(JSON.parse(savedAuth));
      }
    }
    setLoading(false);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
