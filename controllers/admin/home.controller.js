const homeService = require("../../services/admin/account.services");

// [GET] admin/home
module.exports.index = (req, res) => {
  res.send("Home admin page");
};

// [GET] admin/all
module.exports.getAllAccounts = async (req, res) => {
  try {
    const users = await homeService.getAllAccounts();
    res.json({
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: err.message });
  }
};

// [GET] admin/detail/:id
module.exports.getAccountByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await homeService.getAccountByID(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User retrieved successfully",
      user: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: err.message });
  }
};

// [DELETE] admin/delete/:id
module.exports.deleteAccountByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await homeService.deleteAccountByID(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};
