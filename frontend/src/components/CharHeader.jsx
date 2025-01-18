import { useChatStore } from "../store/useChatStore"
import {useAuthStore} from "../store/useAuthStore"
function CharHeader() {
    const defaultProfilePic =
    "https://tse2.mm.bing.net/th?id=OIP.AMuITtaBEpeV3rkv96skRgHaD3&pid=Api&P=0&h=180";

    const {selectedUser , setSelectedUser} = useChatStore()
    const {onLineUsers} = useAuthStore()
  return (
    <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.profilePic || defaultProfilePic } alt="" />
                    </div>
                </div>
                <div>
                    <h3 className="dont-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                    {onLineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
                <button className=" mx-10 text-red-500 text-2xl " onClick={() => setSelectedUser(null)}>X</button>
            </div>
        </div>
    </div>
  )
}
export default CharHeader