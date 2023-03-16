import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [2, 100],
              msg: 'O nome precisa ter entre 2 e 100 caracteres.',
            },
          },
        },

        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [2, 100],
              msg: 'O sobrenome precisa ter entre 2  e 100 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail já existe',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido',
            },
          },
        },
        idade: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'Idade precisa ser um número inteiro.',
            },
          },
        },
      },

      {
        sequelize,
      },
    );
    return this;
  }
}
