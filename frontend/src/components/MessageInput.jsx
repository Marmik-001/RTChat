import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef();
  const { sentMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend  = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
  };}
  const removeImage = () => {
    setPreviewImage(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const handleSentMessage = async (e) => {
    e.preventDefault();
    if(!text && previewImage === null) {
      return;
    }

    try {
      await sentMessage({ text: text.trim(), image: previewImage });
      setText("");
      setPreviewImage(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  console.log('this ',previewImage);
  return (
    <div className="p-4 w-full ">
      {previewImage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={previewImage}
              alt=""
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-200 flex items-center justify-center"
              type="button"
            >
              X
            </button>
          </div>
        </div>
      )}

      

      <form onSubmit={handleSentMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Message ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="file" accept="image/*"  className="hidden" ref={fileInputRef} onChange={handleImageChange}/>
          <button type="button" onClick={() => fileInputRef.current?.click()}  className="hidden sm:flex btn btn-circle"> Image </button>
        </div>
        <button type="submit" className="btn btn-sm btn-circle" disabled={!text && previewImage=== null  }>Send</button>
      </form>
    </div>
  );
}
export default MessageInput;
