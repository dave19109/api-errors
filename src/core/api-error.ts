import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { CustomError } from 'ts-custom-error'

import type {
  ApiErrorInit,
  ApiErrorLink,
  ApiErrorMeta,
  ApiErrorObject,
  ApiErrorResponse,
  ApiErrorSource
} from './types'

export class ApiError extends CustomError {
  readonly id: string
  readonly link?: ApiErrorLink
  readonly status: `${number}`
  readonly code: string
  readonly title: string
  readonly detail: string
  readonly source?: ApiErrorSource
  readonly meta?: ApiErrorMeta

  constructor(input: ApiErrorInit = {}) {
    const fallbackStatus = StatusCodes.INTERNAL_SERVER_ERROR
    const status = input.status ?? (`${fallbackStatus}` as `${number}`)
    const title = input.title ?? getReasonPhrase(fallbackStatus)
    const detail = input.detail ?? 'An unexpected error occurred.'

    super(detail)

    this.id = input.id ?? 'unknown-error'
    this.link = input.link
    this.status = status
    this.code = input.code ?? 'INTERNAL_SERVER_ERROR'
    this.title = title
    this.detail = detail
    this.source = input.source
    this.meta = input.meta

    // Compatibility for ES5 targets
    Object.setPrototypeOf(this, new.target.prototype)
    CustomError.captureStackTrace?.(this, ApiError)
  }

  /**
   * Checks if a value is an instance of ApiError.
   * @param value The value to check.
   * @returns True if the value is an instance of ApiError, false otherwise.
   */
  static isApiError(value: unknown): value is ApiError {
    return value instanceof ApiError
  }

  /**
   * Converts the ApiError to a JSON:API error response.
   * @returns The JSON:API error response.
   */
  toJSON(): ApiErrorResponse {
    const error: ApiErrorObject = {
      id: this.id,
      link: this.link,
      status: this.status,
      code: this.code,
      title: this.title,
      detail: this.detail,
      source: this.source,
      meta: this.meta
    }

    return { errors: [error] }
  }
}
