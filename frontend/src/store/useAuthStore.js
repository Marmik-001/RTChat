import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";
import { io } from 'socket.io-client'
const BASE_URL = 'http://localhost:5002';
export const useAuthStore = create((set , get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    onLineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check-auth");
            set({authUser: response.data});
            get().connectSocket();
        } catch (error) {
            console.log("error in checkAuth", error.message);
            
            set({authUser: null});
        }
        finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (FormData) =>{
        set({isSigningUp: true});
        try {
            const response = await axiosInstance.post("/auth/signup", FormData);
            if(response.status === 201) {
                set({authUser: response.data});
            }
            toast.success("Signed up successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({isSigningUp: false});
        }
    },
    signout: async() => {
        try {
            const response = await axiosInstance.post("/auth/signout");
            if(response.status === 200) {
                set({authUser: null});
                toast.success(response.data.message);
                get().disconnectSocket();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    signin: async (FormData) => {
        set({isSigningIn: true});
        try {
            const response = await axiosInstance.post("/auth/signin", FormData);
            if(response.status === 200) {
                set({authUser: response.data});
                toast.success("Signed in successfully");
                get().connectSocket();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({isSigningIn: false});
        }
    },
    updateProfile:async (data) => {
        set({isUpdatingProfile: true});

        try {
            const response  =await axiosInstance.put("/auth/update-profile", data);
            if(response.status === 200) {
                set({authUser: response.data});
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({isUpdatingProfile: false});
        }
    },
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query:{
                userId:authUser._id
            }
        }) 
        socket.connect();
        set({socket:socket});
        
        socket.on("getOnlineUsers" , (userIds) => {
            set({onLineUsers: userIds});
        })
    },
    disconnectSocket: () => {
        if(get().socket) {
            get().socket.disconnect();
            set({socket: null});
        }
    },

}))