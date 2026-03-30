import {
  ApiError,
  BadGatewayError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  InternalServerError,
  MethodNotAllowedError,
  NotAcceptableError,
  NotFoundError,
  NotImplementedError,
  PayloadTooLargeError,
  PreconditionFailedError,
  RequestTimeoutError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
  UnsupportedMediaTypeError
} from '../src'

interface ErrorCase {
  readonly name: string
  readonly ErrorClass: new (
    params: Record<string, unknown>
  ) => {
    readonly id: string
    readonly status: string
    readonly code: string
    readonly title: string
    readonly detail: string
    toJSON: () => unknown
  }
  readonly defaults: {
    readonly id: string
    readonly status: string
    readonly code: string
    readonly title: string
    readonly detail: string
  }
}

const meta = { traceId: 'trace-id' }
const source = { pointer: '/data/attributes/name' }

const errorCases: ErrorCase[] = [
  {
    name: 'BadRequestError',
    ErrorClass: BadRequestError,
    defaults: {
      id: 'bad-request',
      status: BadRequestError.status,
      code: 'BAD_REQUEST',
      title: 'Bad Request',
      detail: 'The request is invalid or malformed.'
    }
  },
  {
    name: 'UnauthorizedError',
    ErrorClass: UnauthorizedError,
    defaults: {
      id: 'unauthorized',
      status: UnauthorizedError.status,
      code: 'UNAUTHORIZED',
      title: 'Unauthorized',
      detail: 'Authentication is required to access this resource.'
    }
  },
  {
    name: 'ForbiddenError',
    ErrorClass: ForbiddenError,
    defaults: {
      id: 'forbidden',
      status: ForbiddenError.status,
      code: 'FORBIDDEN',
      title: 'Forbidden',
      detail: 'You do not have permission to access this resource.'
    }
  },
  {
    name: 'NotFoundError',
    ErrorClass: NotFoundError,
    defaults: {
      id: 'not-found',
      status: NotFoundError.status,
      code: 'NOT_FOUND',
      title: 'Not Found',
      detail: 'The requested resource was not found.'
    }
  },
  {
    name: 'MethodNotAllowedError',
    ErrorClass: MethodNotAllowedError,
    defaults: {
      id: 'method-not-allowed',
      status: MethodNotAllowedError.status,
      code: 'METHOD_NOT_ALLOWED',
      title: 'Method Not Allowed',
      detail: 'The HTTP method is not allowed for this resource.'
    }
  },
  {
    name: 'NotAcceptableError',
    ErrorClass: NotAcceptableError,
    defaults: {
      id: 'not-acceptable',
      status: NotAcceptableError.status,
      code: 'NOT_ACCEPTABLE',
      title: 'Not Acceptable',
      detail: 'The requested response format is not supported.'
    }
  },
  {
    name: 'RequestTimeoutError',
    ErrorClass: RequestTimeoutError,
    defaults: {
      id: 'request-timeout',
      status: RequestTimeoutError.status,
      code: 'REQUEST_TIMEOUT',
      title: 'Request Timeout',
      detail: 'The server timed out waiting for the request.'
    }
  },
  {
    name: 'ConflictError',
    ErrorClass: ConflictError,
    defaults: {
      id: 'conflict',
      status: ConflictError.status,
      code: 'CONFLICT',
      title: 'Conflict',
      detail: 'The request conflicts with the current state of the resource.'
    }
  },
  {
    name: 'GoneError',
    ErrorClass: GoneError,
    defaults: {
      id: 'gone',
      status: GoneError.status,
      code: 'GONE',
      title: 'Gone',
      detail: 'The requested resource is no longer available.'
    }
  },
  {
    name: 'PreconditionFailedError',
    ErrorClass: PreconditionFailedError,
    defaults: {
      id: 'precondition-failed',
      status: PreconditionFailedError.status,
      code: 'PRECONDITION_FAILED',
      title: 'Precondition Failed',
      detail: 'One or more request preconditions were not met.'
    }
  },
  {
    name: 'PayloadTooLargeError',
    ErrorClass: PayloadTooLargeError,
    defaults: {
      id: 'payload-too-large',
      status: PayloadTooLargeError.status,
      code: 'PAYLOAD_TOO_LARGE',
      title: 'Payload Too Large',
      detail: 'The request payload exceeds the allowed size limit.'
    }
  },
  {
    name: 'UnsupportedMediaTypeError',
    ErrorClass: UnsupportedMediaTypeError,
    defaults: {
      id: 'unsupported-media-type',
      status: UnsupportedMediaTypeError.status,
      code: 'UNSUPPORTED_MEDIA_TYPE',
      title: 'Unsupported Media Type',
      detail: 'The request media type is not supported.'
    }
  },
  {
    name: 'UnprocessableEntityError',
    ErrorClass: UnprocessableEntityError,
    defaults: {
      id: 'unprocessable-entity',
      status: UnprocessableEntityError.status,
      code: 'UNPROCESSABLE_ENTITY',
      title: 'Unprocessable Entity',
      detail: 'The request payload is syntactically correct but semantically invalid.'
    }
  },
  {
    name: 'TooManyRequestsError',
    ErrorClass: TooManyRequestsError,
    defaults: {
      id: 'too-many-requests',
      status: TooManyRequestsError.status,
      code: 'TOO_MANY_REQUESTS',
      title: 'Too Many Requests',
      detail: 'Too many requests were sent in a given amount of time.'
    }
  },
  {
    name: 'InternalServerError',
    ErrorClass: InternalServerError,
    defaults: {
      id: 'internal-server-error',
      status: InternalServerError.status,
      code: 'INTERNAL_SERVER_ERROR',
      title: 'Internal Server Error',
      detail: 'An unexpected server error occurred.'
    }
  },
  {
    name: 'NotImplementedError',
    ErrorClass: NotImplementedError,
    defaults: {
      id: 'not-implemented',
      status: NotImplementedError.status,
      code: 'NOT_IMPLEMENTED',
      title: 'Not Implemented',
      detail: 'This functionality is not implemented yet.'
    }
  },
  {
    name: 'BadGatewayError',
    ErrorClass: BadGatewayError,
    defaults: {
      id: 'bad-gateway',
      status: BadGatewayError.status,
      code: 'BAD_GATEWAY',
      title: 'Bad Gateway',
      detail: 'The server received an invalid response from an upstream server.'
    }
  },
  {
    name: 'ServiceUnavailableError',
    ErrorClass: ServiceUnavailableError,
    defaults: {
      id: 'service-unavailable',
      status: ServiceUnavailableError.status,
      code: 'SERVICE_UNAVAILABLE',
      title: 'Service Unavailable',
      detail: 'The service is temporarily unavailable.'
    }
  },
  {
    name: 'GatewayTimeoutError',
    ErrorClass: GatewayTimeoutError,
    defaults: {
      id: 'gateway-timeout',
      status: GatewayTimeoutError.status,
      code: 'GATEWAY_TIMEOUT',
      title: 'Gateway Timeout',
      detail: 'The upstream server took too long to respond.'
    }
  }
]

describe('api-errors: common HTTP errors', () => {
  test.each(errorCases)('%s should expose default values', ({ ErrorClass, defaults }) => {
    const error = new ErrorClass({})

    expect(error.id).toBe(defaults.id)
    expect(error.status).toBe(defaults.status)
    expect(error.code).toBe(defaults.code)
    expect(error.title).toBe(defaults.title)
    expect(error.detail).toBe(defaults.detail)
  })

  test.each(errorCases)('%s should serialize to JSON:API error', ({ ErrorClass, defaults }) => {
    const error = new ErrorClass({
      ...defaults,
      id: 'custom-id',
      code: 'CUSTOM_CODE',
      title: 'Custom Title',
      detail: 'Custom detail message',
      meta,
      source
    })

    expect(error.toJSON()).toEqual({
      errors: [
        {
          id: 'custom-id',
          status: defaults.status,
          code: 'CUSTOM_CODE',
          title: 'Custom Title',
          detail: 'Custom detail message',
          meta,
          source
        }
      ]
    })
  })

  test.each(errorCases)('%s should be throwable and caught as ApiError', ({ ErrorClass }) => {
    const thrower = (): void => {
      throw new ErrorClass({})
    }

    expect(thrower).toThrow(ApiError)
    expect(thrower).toThrow(Error)

    try {
      thrower()
    } catch (err) {
      expect(ApiError.isApiError(err)).toBe(true)
      expect(err).toBeInstanceOf(ApiError)
      expect(err).toBeInstanceOf(ErrorClass)
    }
  })
})
