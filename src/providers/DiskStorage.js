import fs from 'node:fs'
import path from 'node:path'
import { uploadConfig } from '../configs/upload.js'

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file),
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    console.log(`este é o arruivo${filePath}`)
    try {
      await fs.promises.stat(filePath)
    } catch {
      return null
    }
    await fs.promises.unlink(filePath)
  }
}

export { DiskStorage }
