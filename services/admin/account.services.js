const User = require("../../models/user.model");

// Get all accounts
module.exports.getAllAccounts = async () => {
  try {
    const users = await User.find();
    const usersWithoutSensitiveInfo = users.map((user) => {
      const { password, verificationToken, ...userWithoutSensitiveInfo } =
        user.toObject();
      return userWithoutSensitiveInfo;
    });
    return usersWithoutSensitiveInfo;
  } catch (err) {
    return err.message;
  }
};

// Get account by id
module.exports.getAccountByID = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return;
    }
    const { password, verificationToken, ...userWithoutSensitiveInfo } =
      user.toObject();
    return userWithoutSensitiveInfo;
  } catch (err) {
    return err.message;
  }
};

// Delete account by username
module.exports.deleteAccountByID = async (id) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (err) {
    return { message: "Error deleting user", error: err.message };
  }
};
