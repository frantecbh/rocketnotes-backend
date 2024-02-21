import jwt from 'jsonwebtoken'
import { AppError } from '../utils/AppError.js'
import { authConfig } from '../configs/auth.js'

export function ensureAutheticated(request, response, next) {
  const authToken = request.headers.authorization

  if (!authToken) {
    throw new AppError('JWT Token não informado', 401)
  }

  // verify Bare aldfjlasjdflasjfdlalfjsaf
  const [, token] = authToken.split(' ')

  const { secret } = authConfig.jwt

  try {
    const { sub: user_id } = jwt.verify(token, secret)

    request.user = {
      id: user_id,
    }

    return next()
  } catch {
    throw new AppError('JWT Token invalido', 401)
  }
}
