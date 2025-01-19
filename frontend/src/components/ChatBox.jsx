import { useChatStore } from "../store/useChatStore";
import { useEffect ,useRef} from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./CharHeader";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
function ChatBox() {
  const defaultProfilePic =
    "https://tse2.mm.bing.net/th?id=OIP.AMuITtaBEpeV3rkv96skRgHaD3&pid=Api&P=0&h=180";

  const { messages, getMessages, isMessageLoading, selectedUser , subscribeToMessages , unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser);
    subscribeToMessages()


    return () => {
      unsubscribeFromMessages()
    }
    
  }, [getMessages, selectedUser._id , subscribeToMessages , unsubscribeFromMessages]);

  useEffect(() => {
    if(messagesEndRef.current && messages.length > 0) 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  })

  if (isMessageLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messagesEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || defaultProfilePic
                        : selectedUser.profilePic || defaultProfilePic
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="chat-header mb-1 ">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col ">
                {message.image && (
                  <img
                    src={message.image}
                    alt="lmao"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && message.text}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
}
export default ChatBox;
