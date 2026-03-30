import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "408 Request Timeout" error in JSON:API format.
 */
export class RequestTimeoutError extends ApiError {
  static readonly status = `${StatusCodes.REQUEST_TIMEOUT}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'request-timeout',
      code: normalizedParams.code ?? 'REQUEST_TIMEOUT',
      status: RequestTimeoutError.status,
      title: normalizedParams.title ?? 'Request Timeout',
      detail: normalizedParams.detail ?? 'The server timed out waiting for the request.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
