import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "400 Bad Request" error in JSON:API format.
 */
export class BadRequestError extends ApiError {
  static readonly status = `${StatusCodes.BAD_REQUEST}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'bad-request',
      code: normalizedParams.code ?? 'BAD_REQUEST',
      status: BadRequestError.status,
      title: normalizedParams.title ?? 'Bad Request',
      detail: normalizedParams.detail ?? 'The request is invalid or malformed.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
