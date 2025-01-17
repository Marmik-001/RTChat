import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import SideBar from "../components/SideBar"
import NoChatSelected from "../components/NoChatSelected"
import ChatBox from "../components/ChatBox"
function HomePage() {

  const { selectedUser } = useChatStore()


  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-2xl p-4 w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className="flex h-full overflow-hidden rounded-lg">
          <SideBar />
          {!selectedUser ? <NoChatSelected /> : <ChatBox />}
        </div>
        </div>
      </div>
      
      

    </div>
  )
}
export default HomePage