import z from 'zod'

const userSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  email: z
    .string({ required_error: 'User Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    required_error: 'User password is required.',
  }),
})

export function validateUser(input: any) {
  return userSchema.safeParse(input)
}

export function validateLoginlUser(input: any) {
  return userSchema.partial({ email: true }).safeParse(input)
}

const applicantUserSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  email: z
    .string({ required_error: 'User Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    required_error: 'User password is required.',
  }),
  name: z.string({
    required_error: 'Name is required.',
  }),
  lastName: z.string({
    required_error: 'Lastname is required.',
  }),
})

export function validateApplicantUser(input: any) {
  return applicantUserSchema.safeParse(input)
}

const companyUserSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  email: z
    .string({ required_error: 'User Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    required_error: 'User password is required.',
  }),
  businessName: z.string({
    required_error: 'businessName is required.',
  }),
  description: z.string({
    required_error: 'Description is required.',
  }),
})

export function validateCompanyUser(input: any) {
  return companyUserSchema.safeParse(input)
}

const changePasswordSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required.',
  }),
  newPassword: z.string({
    required_error: 'New password is required.',
  }),
  confirmPassword: z.string({
    required_error: 'Confirm password is required.',
  }),
})

export function validateChangePassword(input: any) {
  return changePasswordSchema.safeParse(input)
}

const forgotPasswordSchema = z.object({
  userOrMail: z.string({
    required_error: 'Username or mail is required.',
  }),
})

export function validateForgotPassword(input: any) {
  return forgotPasswordSchema.safeParse(input)
}

const forgotConfirmSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  newPassword: z.string({
    required_error: 'New password is required.',
  }),
  confirmPassword: z.string({
    required_error: 'Confirm password is required.',
  }),
  code: z.string({
    required_error: 'Code is required.',
  }),
})

export function validateForgotConfirm(input: any) {
  return forgotConfirmSchema.safeParse(input)
}
