import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "404 Not Found" error in JSON:API format.
 */
export class NotFoundError extends ApiError {
  static readonly status = `${StatusCodes.NOT_FOUND}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'not-found',
      code: normalizedParams.code ?? 'NOT_FOUND',
      status: NotFoundError.status,
      title: normalizedParams.title ?? 'Not Found',
      detail: normalizedParams.detail ?? 'The requested resource was not found.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
