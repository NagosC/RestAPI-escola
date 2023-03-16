import jwt from 'jsonwebtoken';
import User from '../models/user';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['O email e a senha tem que ser enviados'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não encontrado!'],
      });
    }

    if (!(await user.passwordValidation(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }
    const { id } = user;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
