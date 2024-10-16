// components/authConfig.ts
import * as AuthSession from "expo-auth-session";
import { useState } from "react";
import ApiCall from "../api/ApiCall";
import type { LinkedinData } from "../types/extraTypes";

export const redirectUri = AuthSession.makeRedirectUri({
  scheme: "myapp",
  path: "redirect",
});
const [data, setData] = useState<LinkedinData>(null);
const [loading, setLoading] = useState<boolean>(true);
ApiCall<LinkedinData>({ api: "GET", key: "linkedinData", setData, setLoading });
const oauthClientId = data?.clientId;
const oauthDomain = data?.clientDomain;

export const authConfig = {
  clientId: oauthClientId!,
  domain: oauthDomain,
  redirectUri: redirectUri,
};
console.log(authConfig);
export const request = new AuthSession.AuthRequest({
  clientId: authConfig.clientId,
  redirectUri,
  scopes: ["openid", "profile", "email"],
  responseType: AuthSession.ResponseType.Token,
});

//Possible function to pull user data from the server
const fetchUserData = async (accessToken) => {
  try {
    const response = await fetch("https://your-nextjs-app.com/api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};
