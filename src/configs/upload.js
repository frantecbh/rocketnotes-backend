import multer from 'multer'

import crypto from 'node:crypto'
import path from 'node:path'

import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')

const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`
      console.log(`diretorio ${TMP_FOLDER}`)
      return callback(null, fileName)
    },
  }),
}

export const uploadConfig = { TMP_FOLDER, UPLOADS_FOLDER, MULTER }
