import { randomUUID } from 'node:crypto'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import indent from '../utils/indent'
import { ApiError } from './api-error'
import type { ApiErrorObject } from './types'

const cleanInternalStack = (stack: string): string => stack.replaceAll(/\s+at .*aggregate-error\/.*:\d+:\d+\)?/g, '')

export class AggregateApiError extends Error {
  readonly errors: ApiError[]
  readonly status: string
  readonly code: string
  readonly title: string
  readonly detail: string
  readonly meta?: Record<string, unknown>
  readonly id: string

  constructor(errors: Array<ApiError | ApiErrorObject | string | Error>) {
    if (!Array.isArray(errors)) {
      throw new TypeError(`Expected input to be an Array, got ${typeof errors}`)
    }

    const apiErrors = errors.map((err) => {
      if (err instanceof ApiError) {
        return err
      }

      if (err instanceof Error) {
        return new ApiError({
          id: randomUUID(),
          code: 'INTERNAL_SERVER_ERROR',
          status: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
          title: err.name || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          detail: err.message,
          meta: { stack: cleanInternalStack(err.stack || '') }
        })
      }

      if (typeof err === 'string') {
        return new ApiError({
          id: randomUUID(),
          code: 'INTERNAL_SERVER_ERROR',
          status: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
          title: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          detail: err
        })
      }

      return new ApiError({
        id: err.id ?? randomUUID(),
        code: err.code ?? 'INTERNAL_SERVER_ERROR',
        status: err.status ?? `${StatusCodes.INTERNAL_SERVER_ERROR}`,
        title: err.title ?? getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        detail: err.detail ?? 'An unexpected error occurred.',
        link: err.link,
        source: err.source,
        meta: err.meta
      })
    })

    // Compose message
    const message = `\n${indent(apiErrors.map((e) => `${e.title}: ${e.detail}`).join('\n'), 4)}`

    super(message)

    this.name = 'ApiAggregateError'
    this.errors = apiErrors
    this.status = this.errors[0]?.status ?? StatusCodes.INTERNAL_SERVER_ERROR.toString()
    this.code = 'AGGREGATE_ERROR'
    this.title = 'Multiple errors occurred'
    this.detail = 'See individual errors for details.'
    this.meta = { count: apiErrors.length }
    this.id = randomUUID()

    Error.captureStackTrace(this, AggregateApiError)
  }

  /**
   * Converts the ApiAggregateError to a JSON:API error response.
   * @returns The JSON:API error response.
   */
  toJSON(): {
    errors: ApiErrorObject[]
    meta: Record<string, unknown>
  } {
    const errors = this.errors.map((e) => {
      const json = e.toJSON()
      return json.errors[0]
    })

    return {
      errors: errors,
      meta: {
        aggregateId: this.id,
        count: this.errors.length
      }
    }
  }
}
