import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "403 Forbidden" error in JSON:API format.
 */
export class ForbiddenError extends ApiError {
  static readonly status = `${StatusCodes.FORBIDDEN}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'forbidden',
      code: normalizedParams.code ?? 'FORBIDDEN',
      status: ForbiddenError.status,
      title: normalizedParams.title ?? 'Forbidden',
      detail: normalizedParams.detail ?? 'You do not have permission to access this resource.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
