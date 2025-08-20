"use server";

import { getBaseUrl } from "@/api-helper/base-url";
import { cookies } from "next/headers";

export async function logout(){
    const c = await cookies();
    const token = c.get('token');

    const baseUrl = getBaseUrl()

    if(token){
        try {
            // Call the invalidate API
            const response = await fetch(baseUrl + '/api/auth/invalidate', {
                method: 'POST',
                headers: {
                    'Cookie': `token=${token.value}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to invalidate token');
            }

            // Clear the cookie on server side as well
            c.delete('token');
            
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear the cookie even if invalidation fails
            c.delete('token');
            return { success: false, error: 'Logout failed' };
        }
    }

    return { success: true };
}