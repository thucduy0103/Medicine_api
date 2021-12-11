const Message = require('../models/message.model');

module.exports = (socket) => {

  const joinRoom = (data) => {
    // console.log(data);
    socket.leave(socket.id);
    socket.join(data.roomId);
  } 

  const leaveRoom = (data) => {
    socket.leave(data.roomId);
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