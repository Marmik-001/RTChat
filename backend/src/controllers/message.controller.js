import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log("loggedInUserId", loggedInUserId);
        
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("fullName profilePic");


        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getUsersForSidebar", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getMessages = async (req, res) => {
    try {
         const { id:reciverId } = req.params;
         const senderId = req.user._id; 

         const message = await Message.find({
            $or:[
                {senderId: reciverId, reciverId: senderId},
                {senderId: senderId, reciverId: userToChatId}
            ]
         })
         res.status(200).json(message);
    } catch (error) {
        console.log("error in getMessages", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const sendMessage = async (req, res) => {
    try {
        
        const {text , image } = req.body;
        const { id:reciverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;

        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        // real time messaging functionality remaining
        res.status(201).json(newMessage);




    } catch (error) {
        console.log("error in sendMessage", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
