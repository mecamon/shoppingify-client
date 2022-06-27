import {validEmail, validLengthField, validPassword} from "./validators";

describe('Validators', () => {
  const validateEmailTests = [
    {testName: 'Invalid email address', email: 'invalid-@address', expectedResult: false},
    {testName: 'Valid email address', email: 'valid@mail.com', expectedResult: true}
  ]
  validateEmailTests.forEach(tt => {
    test(tt.testName, () => {
      const result = validEmail(tt.email)
      expect(result).toEqual(tt.expectedResult)
    })
  })

  const validPasswordTests = [
    {testName: 'Invalid password 1', password: 'inval00', expectedResult: false},
    {testName: 'Invalid password 2', password: 'InvalidPass', expectedResult: false},
    {testName: 'Valid password', password: 'ValidPass123445', expectedResult: true},
  ]
  validPasswordTests.forEach(tt => {
    test(tt.testName, () => {
      const isValid = validPassword(tt.password)
      expect(isValid).toEqual(tt.expectedResult)
    })
  })

  const validFieldLengthTests = [
    {testName: 'Invalid field length 1', field: 'r', min: 2, max: 6, expectedResult: false},
    {testName: 'Invalid field length 2', field: 'ddasdadadasd', min: 2, max: 6, expectedResult: false},
    {testName: 'Valid field length', field: 'George', min: 2, max: 18, expectedResult: true}
  ]
  validFieldLengthTests.forEach(tt => {
    const result = validLengthField(tt.field, tt.min, tt.max)
    expect(result).toEqual(tt.expectedResult)
  })

})
