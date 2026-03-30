import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "429 Too Many Requests" error in JSON:API format.
 */
export class TooManyRequestsError extends ApiError {
  static readonly status = `${StatusCodes.TOO_MANY_REQUESTS}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'too-many-requests',
      code: normalizedParams.code ?? 'TOO_MANY_REQUESTS',
      status: TooManyRequestsError.status,
      title: normalizedParams.title ?? 'Too Many Requests',
      detail: normalizedParams.detail ?? 'Too many requests were sent in a given amount of time.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
