const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getMessage = catchAsync(async (req, res) => {
  res.send("user");
});

const roleUser = catchAsync(async (req, res) => {
  const role = [
    {
      id: 0,
      nameRole : "Quản trị" 
    },
    {
      id: 1,
      nameRole : "Khách hàng" 
     }
  ]
  res.send(role);
});

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString().concat(file.originalname));
    }
  });
const upload = multer({ storage: storage }).single('image');

const uploadImage = function(req, res) {
  // const user = await userService.updateUserById(req.user._id, req.body);
  // res.send(user);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
        console.log(err);
      return res.status(500).json({status:500,data:err,message:"error"});
    } else if (err) {
        console.log(err);
      // An unknown error occurred when uploading.
      return res.status(500).json({status:500,data:err,message:"error"});
    }
    //console.log(req.file); 
    return res.status(200).json({status:200,data:req.file.filename,message:"success"});
  })
};

const updateMe = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user._id, req.body);
  res.send(user);
});

const updateEmail = catchAsync(async (req, res) => {
  const user = await userService.updateEmail(req.user._id, req.body);
  res.send(user);
});

const updatePassword = catchAsync(async (req, res) => {
  const user = await userService.updatePassword(req.user._id, req.body);
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  getMe,
  getMessage,
  roleUser,
  updateUser,
  deleteUser,
  uploadImage,
  updateMe,
  updateEmail,
  updatePassword,
};
