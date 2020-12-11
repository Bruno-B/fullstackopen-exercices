const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });
  const savedUser = await user.save();
  response.json(savedUser);
});


userRouter.get('/',async(request,response,next)=> {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter;
