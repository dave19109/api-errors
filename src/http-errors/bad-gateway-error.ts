import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "502 Bad Gateway" error in JSON:API format.
 */
export class BadGatewayError extends ApiError {
  static readonly status = `${StatusCodes.BAD_GATEWAY}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'bad-gateway',
      code: normalizedParams.code ?? 'BAD_GATEWAY',
      status: BadGatewayError.status,
      title: normalizedParams.title ?? 'Bad Gateway',
      detail: normalizedParams.detail ?? 'The server received an invalid response from an upstream server.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
