import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "500 Internal Server Error" error in JSON:API format.
 */
export class InternalServerError extends ApiError {
  static readonly status = `${StatusCodes.INTERNAL_SERVER_ERROR}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'internal-server-error',
      code: normalizedParams.code ?? 'INTERNAL_SERVER_ERROR',
      status: InternalServerError.status,
      title: normalizedParams.title ?? 'Internal Server Error',
      detail: normalizedParams.detail ?? 'An unexpected server error occurred.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
