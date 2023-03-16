import User from '../models/user';

class UserController {
  // Store
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      const { id, email, nome } = novoUser;

      return res.json({ id, email, nome });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),

      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const { id, email, nome } = user;

      return res.json({ id, email, nome });
    } catch (e) {
      return res.json(null);
    }
  }

  // uptade
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const newUser = await user.update(req.body);

      const { id, nome, email } = newUser;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não exsite'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
