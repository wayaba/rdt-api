import z from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../config'

const companySchema = z.object({
  businessName: z.string({
    required_error: 'Business name is required.',
  }),
  description: z.string({
    required_error: 'description is required.',
  }),
  image: z
    .any()
    .optional()
    .refine((file) => {
      return !Array.isArray(file)
    }, `El atributo image solo se puede enviar una vez.`)
    .refine((file) => {
      if (Array.isArray(file)) return true
      return file.size <= MAX_FILE_SIZE
    }, `Max file size is 5MB.`)
    .refine((file) => {
      if (Array.isArray(file)) return true
      return ACCEPTED_IMAGE_TYPES.includes(file.mimetype)
    }, '.jpg, .jpeg, .png and .webp files are accepted.'),
})

export function validateCompany(input: any) {
  return companySchema.partial().safeParse(input)
}
