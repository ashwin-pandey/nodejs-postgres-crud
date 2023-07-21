const User = require('../model/user.model.js');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const newUser = await User.create({ name, email });
      return res.json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.findAll();
      return res.json(allUsers);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching users' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching user' });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;
      const user = await User.findByPk(userId);
      if (user) {
        await user.update({ name, email });
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user' });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy();
        return res.json({ message: 'User deleted successfully' });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting user' });
    }
  }
}