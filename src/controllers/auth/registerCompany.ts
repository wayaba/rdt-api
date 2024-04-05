import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'

import { IUser, UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateCompanyUser } from '../../schemas/auth'
import { env } from '../../config'
import mailService from '../../lib/nodemailer'
import { getToken } from '../../utils/jwt'
import { userType } from '../../utils/constants'
import { CompanyModel, ICompany } from '../../models/company.model'
import { validateCompany } from '../../schemas/company'
import { UploadImageResult, uploadImage } from '../../utils/uploadImage'

export async function registerCompany(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateCompanyUser(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    if (req.files?.image) {
      const resultImage = validateCompany(req.files)

      if (!resultImage.success) {
        if (req.files?.image) {
          const files: UploadedFile | UploadedFile[] | undefined =
            req.files?.image
          if (Array.isArray(files)) {
            for (const file of files) {
              await fs.unlink(file.tempFilePath)
            }
          } else if (files) {
            await fs.unlink(files.tempFilePath)
          }
        }

        //@ts-ignore
        res.status(400).json({ error: JSON.parse(resultImage.error.message) })
        return
      }
    }

    const { username, email, password, businessName, description } = result.data

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    })

    if (existingUser) {
      res.status(400).json({ message: messages.error.existingUser })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: IUser = new UserModel({
      ...result.data,
      code: uuidv4(),
      userType: userType.COMPANY,
      password: hashedPassword,
    })

    const token = getToken({ username: username, code: newUser.code })

    const urlConfirm = `${env.APP_API_URL}/auth/confirm/${token}`
    const template = mailService.getConfirmTemplate(username, urlConfirm)
    mailService.send(messages.mail.registerSubject, template, email)

    await newUser.save()

    const userId = newUser._id

    const newCompany: ICompany = new CompanyModel({
      user: userId,
      businessName: businessName,
      description: description,
    })

    if (req.files?.image) {
      const file: UploadedFile | UploadedFile[] | undefined = req.files?.image
      const image = file instanceof Array ? file[0] : file
      let uploadResult: UploadImageResult = await uploadImage(image)
      if (uploadResult.error) {
        res.status(401).json({ message: uploadResult.message })
        return
      }

      if (uploadResult.image) newCompany.image = uploadResult.image
    }

    await newCompany.save()
    res
      .status(201)
      .json({ success: true, message: messages.success.registration })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: messages.error.generic, error })
  }
}
