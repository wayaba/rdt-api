import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { EmploymentTypeModel } from '../../models/employmentType'

export async function getEmploymentType(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const employmentTypes = await EmploymentTypeModel.find()

    res.status(200).json({ employmentTypes: employmentTypes })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
