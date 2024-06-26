import { Request, Response } from 'express'
import { IUser, UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { userStatus } from '../../utils/constants'
import { getTokenData } from '../../utils/jwt'
import { env } from '../../config'

export async function confirm(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.params

    const data = getTokenData(token)

    if (data === null) {
      res.status(401).json({ message: 'Error al obtener leer token' })
      return
    }

    const { username, code } = data

    // // Verificar existencia del usuario
    const user: IUser | null = await UserModel.findOne({ username: username })

    if (user === null) {
      res.status(401).json({ message: messages.error.invalidCredentials })
      return
    }

    // Verificar el código
    if (code !== user.code) {
      return res.redirect(env.APP_ERROR_CODE_PAGE)
    }

    // // Actualizar usuario
    user.status = userStatus.VERIFIED
    await user.save()

    // // Redireccionar a la confirmación
    return res.redirect(env.APP_CONFIRM_PAGE)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: messages.error.generic, error })
  }
}
