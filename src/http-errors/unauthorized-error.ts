import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "401 Unauthorized" error in JSON:API format.
 */
export class UnauthorizedError extends ApiError {
  static readonly status = `${StatusCodes.UNAUTHORIZED}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'unauthorized',
      code: normalizedParams.code ?? 'UNAUTHORIZED',
      status: UnauthorizedError.status,
      title: normalizedParams.title ?? 'Unauthorized',
      detail: normalizedParams.detail ?? 'Authentication is required to access this resource.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
