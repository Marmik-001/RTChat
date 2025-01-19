import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
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
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    console.log("userId", userId._id);

    try {
      const response = await axiosInstance.get(`/message/${userId._id}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error("Failed to fetch messages");
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (user) => {
    //needs optimization
    set({ selectedUser: user });
  },
  sentMessage: async ({ text, image }) => {
    const { selectedUser, messages } = get();
    console.log("img", image);
    try {
      const response = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        { text, image }
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error(error);
    }
  },

  subscribeToMessages:() => {
    const {selectedUser} = get()
    if(!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    })
  },
  unsubscribeFromMessages:() => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  


}));
