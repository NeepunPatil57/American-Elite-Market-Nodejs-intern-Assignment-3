const { register,login,me,logout} = require("../controllers/userController");
const { createPost, getPosts, updatePost,deletePost } = require("../controllers/postController");
const {getProfile,updateProfile,deleteProfile} = require("../controllers/profileController");
const {follow,unfollow,getRequests,acceptRequest,rejectRequest} = require("../controllers/requestController");
const {feed} = require("../controllers/feedController");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const multer  = require('multer');
const JWT_SECRET = 'abcd';


//user routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/me", auth, me);

//post routes
router.post("/create-post", auth, createPost);
router.get("/posts", auth, getPosts);
router.put("/update-post/:id", auth, updatePost);
router.delete("/delete-post/:id", auth, deletePost);

//profile routes
router.get("/profile",auth,getProfile);
router.put("/update-profile",auth,updateProfile);
router.delete("/delete-profile",auth,deleteProfile);

//Request routes
router.put("/follow/:id",auth,follow);
router.put("/unfollow/:id",auth,unfollow);
router.get("/requests",auth,getRequests);
router.put("/accept-request",auth,acceptRequest);
router.delete("/reject-request",auth,rejectRequest);

//feed route
router.get("/feed",auth,feed);


//pfp upload route
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix=Date.now();
      cb(null,uniqueSuffix + file.originalname);
    }
  })
  
const upload = multer({ storage: storage })

router.put("/upload",auth,upload.single('image'),async(req,res)=>{
  try{
    const user=await User.findById(req.user.userId);
    console.log(user);
    user.pfp=req.file.filename;
    await user.save();
    res.status(200).json({message:"Image uploaded successfully"});
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;
