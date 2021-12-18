const Message = require('../models/message.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');

module.exports = (socket) => {

  const joinRoom = (data) => {
    socket.join(data.roomId);
    socket.leave(socket.id);
  } 

  const leaveRoom = (data) => {
    socket.leave(data.room);
  }

  const chatText = async (data) => {
    if(data.senderId === 'admin'){
      socket.to(data.roomId).emit("res_chat_text",data);
      // console.log(data);
    }else{
      socket.to('admin').emit("res_chat_text",data);
      // console.log(data);
    }
    if (!data.roomId.match(/^[0-9a-fA-F]{24}$/)) {
      return 
    }
    const room = await Room.findOne({roomId: data.roomId}).exec()
    if(!room){
      // console.log(data.roomId);
      const user = await User.findById(data.roomId).exec()
      if(!user){
        return
      }
      const newRoom = {
        roomId : data.roomId,
        roomName : user.name,
        roomAvatar : user.avatar,
      }
      Room.create(newRoom)
      socket.emit("new_room",newRoom);
    }
    Message.create(data);
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