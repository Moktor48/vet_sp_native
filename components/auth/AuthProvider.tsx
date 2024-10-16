import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as AuthSession from "expo-auth-session";
import { authConfig } from "./authConfig";

interface AuthContextType {
  user: any;
  login: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "myapp",
      path: "redirect",
    });

    const request = new AuthSession.AuthRequest({
      clientId: authConfig.clientId,
      redirectUri,
      scopes: ["openid", "profile", "email"],
      responseType: AuthSession.ResponseType.Token,
    });

    const discovery = {
      authorizationEndpoint: `https://${authConfig.domain}/authorize`,
      tokenEndpoint: `https://${authConfig.domain}/oauth/token`,
      revocationEndpoint: `https://${authConfig.domain}/oauth/revoke`,
    };

    const result = await request.promptAsync(discovery);

    if (result.type === "success") {
      setAccessToken(result.params.access_token);
      fetchUserInfo(result.params.access_token);
    }
  };

  const fetchUserInfo = async (token: string) => {
    const response = await fetch(`https://${authConfig.domain}/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
