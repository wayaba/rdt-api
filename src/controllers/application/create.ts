import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { JobModel } from '../../models/job.model'
import { validateCreateApplication } from '../../schemas/application'
import { ApplicantModel, IApplicant } from '../../models/applicant.model'
import { ApplicationModel, IApplication } from '../../models/application.model'
import { jobStatus } from '../../utils/constants'
import { WorkExperienceModel } from '../../models/workExperience.model'
import { EducationModel } from '../../models/education.model'
import mailService from '../../lib/nodemailer'
import { CompanyModel } from '../../models/company.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const result = validateCreateApplication(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const existingApplicant = await ApplicantModel.findOne({ user: id })

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    const { job } = result.data

    const existingJob = await JobModel.findOne({ _id: job }).populate('company')
    if (!existingJob) {
      res.status(404).json({ message: messages.error.jobNotFound })
      return
    }

    if (existingJob.status !== jobStatus.ACTIVE) {
      res.status(404).json({ message: messages.error.jobNotActive })
      return
    }

    const existingCompany = await CompanyModel.findOne({
      //@ts-ignore
      _id: existingJob.company.id,
    }).populate('user')

    if (!existingCompany) {
      res.status(404).json({ message: messages.error.companyNotFound })
      return
    }

    const existingApplication = await ApplicationModel.findOne({
      job: job,
      applicant: existingApplicant._id,
    })

    if (existingApplication) {
      res.status(404).json({ message: messages.error.jobAlreadyApplicated })
      return
    }

    if (!(await hasCompleteCv(existingApplicant))) {
      res
        .status(404)
        .json({ message: messages.error.applicantWithCVUncomplete })
      return
    }

    const newApplication: IApplication = new ApplicationModel({
      ...result.data,
      job: existingJob._id,
      applicant: existingApplicant._id,
      creationDate: new Date(),
    })

    await newApplication.save()

    const template = mailService.getApplicationTemplate(
      existingApplicant.name,
      existingApplicant.lastName,
      existingJob.title
    )

    mailService.send(
      messages.mail.newApplicationSubjet,
      template,
      //@ts-ignore
      existingCompany.user.email
    )

    res.status(201).json({ message: messages.success.applicationCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}

const hasCompleteCv = async (applicant: IApplicant) => {
  const hasFilledFields: boolean = Object.keys(applicant.toJSON())
    .filter((key) => key !== 'linkedIn' && key !== 'webSite')
    .every(
      (key) =>
        applicant[key as keyof IApplicant] !== undefined &&
        applicant[key as keyof IApplicant] !== null &&
        applicant[key as keyof IApplicant] !== ''
    )

  const workExperiences = await WorkExperienceModel.find({
    applicant: applicant.id,
  })
  const educations = await EducationModel.find({ applicant: applicant.id })

  return hasFilledFields && workExperiences.length > 0 && educations.length > 0
}
