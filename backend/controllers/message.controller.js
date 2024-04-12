import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// ! SEND
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // get message from user as input
    const { id: receiverId } = req.params; //get user id or receiverId from params
    const senderId = req.user._id; //protecRoute middleware coming from user

    // check if conversation between two users already exist
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if not then create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // socket io

    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);

    // send message as response
    res.status(201).json(newMessage);
  } catch (error) {
    // catch errors
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ! GET
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // if there are no messages return empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in gettingMessages controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
