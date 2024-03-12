import z from 'zod'

const jobSchema = z.object({
  company: z.string({
    required_error: 'Company ID is required.',
  }),
  title: z.string({
    required_error: 'Title is required.',
  }),
  description: z.string({
    required_error: 'Description is required.',
  }),
  duration: z
    .number({
      required_error: 'Duration is required',
    })
    .gt(1)
    .lt(31),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PAUSED']).default('ACTIVE'),
})

export function validateJob(input: any) {
  return jobSchema.partial().safeParse(input)
}