const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});
userRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    if (body.password.length < 4)
      return response.status(400).json({ error: "invalid password" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});


module.exports = userRouter;
