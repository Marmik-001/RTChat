import { useEffect ,useState } from "react";
import { useChatStore } from "../store/useChatStore"
import {useAuthStore} from '../store/useAuthStore'
function SideBar() {
    const { getUsers ,users , isUsersLoading , setSelectedUser  , selectedUser} = useChatStore()
    const { onLineUsers } = useAuthStore()
    const [showOnlineUsers , setShowOnlineUsers] = useState(false)


    const defaultProfilePic =
    "https://tse2.mm.bing.net/th?id=OIP.AMuITtaBEpeV3rkv96skRgHaD3&pid=Api&P=0&h=180";


    console.log('sidebar online users: ', onLineUsers);
    
    useEffect(() => {
        getUsers()
    } , [getUsers])

    const filteredUsers =  showOnlineUsers ? users.filter(user => onLineUsers.includes(user._id)) :users




    if(isUsersLoading) return ( <div>loading...</div>)
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-200 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
          <span className="font-medium hidden lg:block">Contacts</span>
          </div>

          {/* add filter */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex  items-center gap-2">
              <input type="checkbox" checked={showOnlineUsers} className="checkbox checkbox-xs" onChange={(e) => setShowOnlineUsers(e.target.checked) } />
              <span className="text-sm">Show online Users</span>
            </label>
            <span className="text-xs text-zinc-500">({onLineUsers.length - 1} online)</span>
          </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            
            <button 
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center p-3  gap-3 ${selectedUser?._id === user._id ? 'bg-base-300' : ''}`}>
              <div className="relative">
                <img src={user.profilePic || defaultProfilePic  } alt="" className="size-12  object-cover rounded-full" />
                {
                  onLineUsers.includes(user._id) && (
                    <span  className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-200"/>
                  )
                }
              </div>
              <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onLineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
              </div>

            </button>
          ))}
        </div>

    </aside>
  )
}
export default SideBar