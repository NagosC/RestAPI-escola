import multer from 'multer';
import multerConfig from '../config/multer';
import Foto from '../models/foto';

const upload = multer(multerConfig).single('foto');

class PhotoClontroller {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      const { aluno_id } = req.body;

      const { originalname, filename } = req.file;

      const foto = await Foto.create({ originalname, filename, aluno_id });

      return res.json(foto);
    });
  }
}

export default new PhotoClontroller();
