const { default: User } = require("@/models/User");
const { hashPassword } = require("@/utils/auth");
const { default: connectDB } = require("@/utils/connectDB");

async function Handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", Message: "Error in connecting to DB" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      Message: "Invalid Data",
    });
  }

  const exsitingUser = await User.findOne({ email: email });

  if (exsitingUser) {
    return res.status(422).json({
      status: "failed",
      Message: "User exists already",
    });
  }
  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    email: email,
    password: hashedPassword,
  });
  console.log(newUser);

  res.status(201).json({ status: "success", Message: "User created" });
}

export default Handler;
