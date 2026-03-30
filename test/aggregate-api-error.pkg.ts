import { AggregateApiError, ApiError } from '../src'

describe('Testing ApiAggregateError', () => {
  const errors = [
    new ApiError({
      id: 'error1',
      detail: 'First error detail',
      status: '400',
      code: 'FIRST_ERROR',
      title: 'First Error'
    }),
    new ApiError({
      id: 'error2',
      detail: 'Second error detail',
      status: '500',
      code: 'SECOND_ERROR',
      title: 'Second Error'
    }),
    new Error('A generic error'),
    'A string error message'
  ]

  test('should create an ApiAggregateError with the given errors', () => {
    const aggregateError = new AggregateApiError(errors)
    expect(aggregateError).toBeInstanceOf(AggregateApiError)
    expect(aggregateError.errors).toHaveLength(4)
    expect(aggregateError.errors[0].id).toEqual('error1')
    expect(aggregateError.errors[1].id).toEqual('error2')
    expect(aggregateError.errors[2].code).toEqual('INTERNAL_SERVER_ERROR')
    expect(aggregateError.errors[3].detail).toEqual('A string error message')
  })

  test('should return a jsonapi compliant object response', () => {
    const aggregateError = new AggregateApiError(errors)
    const json = aggregateError.toJSON()
    expect(json).toEqual({
      errors: [
        {
          id: expect.any(String),
          detail: expect.any(String),
          status: expect.any(String),
          code: expect.any(String),
          title: expect.any(String),
          meta: undefined,
          link: undefined,
          source: undefined
        },
        {
          id: expect.any(String),
          detail: expect.any(String),
          status: expect.any(String),
          code: expect.any(String),
          title: expect.any(String),
          meta: undefined,
          link: undefined,
          source: undefined
        },
        {
          id: expect.any(String),
          detail: expect.any(String),
          status: expect.any(String),
          code: expect.any(String),
          title: expect.any(String),
          meta: expect.any(Object),
          link: undefined,
          source: undefined
        },
        {
          id: expect.any(String),
          detail: 'A string error message',
          status: expect.any(String),
          code: 'INTERNAL_SERVER_ERROR',
          title: expect.any(String),
          meta: undefined,
          link: undefined,
          source: undefined
        }
      ],
      meta: expect.any(Object)
    })
  })
})
