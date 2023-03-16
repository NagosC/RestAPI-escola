import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome dever ter mais que 3 caracteres',
            },
          },
        },

        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email já existe',
          },

          validate: {
            isEmail: {
              msg: 'Coloque um email válido',
            },

          },
        },

        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha dever ter mais que 6 caracteres',
            },
          },
        },
      },

      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordValidation(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
