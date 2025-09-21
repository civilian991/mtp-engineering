export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // Saudi phone number validation (starts with 05 or +9665)
  const phoneRegex = /^(\+966|0)[5][0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength
}

export interface ValidationError {
  field: string
  message: string
}

export const validateContactForm = (data: {
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!validateRequired(data.name)) {
    errors.push({ field: 'name', message: 'Name is required' })
  } else if (!validateMinLength(data.name, 2)) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' })
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid Saudi phone number' })
  }

  if (!validateRequired(data.subject)) {
    errors.push({ field: 'subject', message: 'Subject is required' })
  }

  if (!validateRequired(data.message)) {
    errors.push({ field: 'message', message: 'Message is required' })
  } else if (!validateMinLength(data.message, 10)) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' })
  } else if (!validateMaxLength(data.message, 1000)) {
    errors.push({ field: 'message', message: 'Message must not exceed 1000 characters' })
  }

  return errors
}

export const validateJobApplication = (data: {
  name: string
  email: string
  phone: string
  coverLetter: string
  resume?: File
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!validateRequired(data.name)) {
    errors.push({ field: 'name', message: 'Name is required' })
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  if (!validateRequired(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required' })
  } else if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid Saudi phone number' })
  }

  if (!validateRequired(data.coverLetter)) {
    errors.push({ field: 'coverLetter', message: 'Cover letter is required' })
  } else if (!validateMinLength(data.coverLetter, 50)) {
    errors.push({ field: 'coverLetter', message: 'Cover letter must be at least 50 characters' })
  }

  if (!data.resume) {
    errors.push({ field: 'resume', message: 'Resume is required' })
  } else if (data.resume.size > 5 * 1024 * 1024) { // 5MB limit
    errors.push({ field: 'resume', message: 'Resume must be less than 5MB' })
  }

  return errors
}