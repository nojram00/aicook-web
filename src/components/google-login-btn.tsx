"use client";
import useCookie from "@/hooks/useCookies";
import useFirebase from "@/hooks/useFirebase";
import React from "react";

export default function GoogleLoginBtn() {
  const { useFireauth } = useFirebase();
  const { googleLogin } = useFireauth();
  const { setCookie } = useCookie();

  const login = () => {
    googleLogin()
      .then((cred) => {
        cred.user.getIdTokenResult().then((token) => {
          // console.log(token.claims);
          setCookie("token", token.token)
        })
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={login}>Login with Google</button>;
}
