const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.UhQisvy1ruI10k2xqfvFqAHaLj?pid=ImgDet&rs=1",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
