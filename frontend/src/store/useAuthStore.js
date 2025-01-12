import {create} from "zustand";
import {axiosInstance} from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,


    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check-auth");
            set({authUser: response.data});
        } catch (error) {
            console.log("error in checkAuth", error.message);
            
            set({authUser: null});
        }
        finally {
            set({isCheckingAuth: false});
        }
    }
}))