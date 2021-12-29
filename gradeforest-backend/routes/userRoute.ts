var express = require("express");
var router = express.Router();

import { model } from "mongoose";
import { User } from "../interfaces/user";
import { UserSchema } from "../schema/userSchema";

const UserModel = model<User>("User", UserSchema);

router.get("/:id", function (req, res) {
  res.send("get");
});

router.post("/", function ({ body: user }: { body: User }, res: any) {
  UserModel.findById(user._id, async (err, docs) => {
    if (!docs) {
      const newDoc = new UserModel(user);
      await newDoc.save();
    }
    res.status(200).json(user);
  });
});

router.put("/:id", function (req, res) {
  res.send("update");
});

router.delete("/:id", function (req, res) {
  res.send("delete");
});

export const userRouter = router;
