import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,

    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/message/users");
            if (response.status === 200) {
                set({ users: response.data });
            }

        } catch (error) {
            toast.error("Failed to fetch users");
        }
        finally{
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/message/${userId}`);
            set({ messages: response.data });
            
        } catch (error) {
            toast.error("Failed to fetch messages");   
            console.log(error);
            
            
        }
        finally{
            set({ isMessagesLoading: false });
        }
    },
    setSelectedUser: (user) => {    //needs optimization
        set({ selectedUser: user });
    },

}))