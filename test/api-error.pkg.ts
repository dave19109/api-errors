import { ApiError } from '../src'

describe('Testing ApiError', () => {
  const errorObj = {
    id: 'testError',
    detail: 'This is a test error',
    status: '400' as `${number}`,
    code: 'TEST_ERROR',
    title: 'Test Error'
  }

  test('should create an ApiError with the given message', () => {
    const error = new ApiError(errorObj)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.detail).toEqual('This is a test error')
    expect(error.id).toEqual('testError')
    expect(error.status).toEqual('400')
    expect(error.code).toEqual('TEST_ERROR')
    expect(error.title).toEqual('Test Error')
  })

  test('should be return a jsonapi compliant object response', () => {
    const error = new ApiError(errorObj)
    const json = error.toJSON()
    expect(json).toEqual({
      errors: [
        {
          id: 'testError',
          detail: 'This is a test error',
          status: '400',
          code: 'TEST_ERROR',
          title: 'Test Error'
        }
      ]
    })
  })

  test('should be throw correctly', () => {
    const error = new ApiError(errorObj)
    expect(() => {
      throw error
    }).toThrow(ApiError)
  })
})
