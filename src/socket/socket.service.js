const Message = require('../models/message.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');

module.exports = (socket) => {

  const joinRoom = async (data) => {
    socket.leave(socket.id);
    const room = await Room.findOne({roomId: data.room}).exec()
    if(!room){
      const user = await User.findById(data.room).exec()
      const newRoom = {
        roomId : data.room,
        roomName : user.name,
        roomAvatar : user.avatar,
      }
      Room.create(newRoom)
    }
    socket.join(data.room);
  } 

  const leaveRoom = (data) => {
    socket.leave(data.room);
  } 

  const chatText = (data) => {
    // console.log(data);
    socket.to(data.roomId).emit("res_chat_text",data);
    // Message.create(data);
  } 
  const chatImage = (data) => {
    socket.to(data.roomId).emit("res_chat_image",data);
    // Message.create(data);
  } 
  socket.on("join_room", joinRoom);
  socket.on("leave_room", leaveRoom);
  socket.on("chat_text", chatText);
  socket.on("chat_image", chatImage);
}