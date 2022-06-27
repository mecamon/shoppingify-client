export function validEmail(email: string): boolean {
  const pattern = /^.{2,}@.{2,}\..{2,}$/
  return pattern.test(email)
}

export function validLengthField(field: string, minLength: number, maxLength: number): boolean  {
  return field.length >= minLength && field.length <= maxLength
}

export function validPassword(password: string): boolean {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return pattern.test(password)
}
