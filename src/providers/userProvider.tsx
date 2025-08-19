'use client';
import useCookie from "@/hooks/useCookies";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    profile_photo?: string;
    uid?: string;
}

const UserContext = createContext<{
    user: User | null
}>({
    user: null
})

export function UserProvider({ children } : {
    children: React.ReactNode
}){

    const { getCookie } = useCookie();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {

        const fetchUser = async () => {
            const cookie = await getCookie('token');

            if(cookie){
                const { value } = cookie
                fetch('/api/auth/verify?show-user', {
                    method: 'POST',
                    body: JSON.stringify({
                        token: value
                    })
                }).then(res => res.json())
                .then(data => {
                    // console.log("Is user valid? ", data.valid)
                    if(data.valid){
                        setUserData({
                            name: data.username,
                            email: data.email,
                            profile_photo: data.profile_photo,
                            uid: data.uid
                        });
                    }
                }).catch(err => {
                    console.warn(err);
                })
            }
        }

        fetchUser();
    }, [getCookie])

    return <UserContext.Provider value={{
        user: userData
    }}>{ children }</UserContext.Provider>
}

export function useProfile(){
    return useContext(UserContext);
}