import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "501 Not Implemented" error in JSON:API format.
 */
export class NotImplementedError extends ApiError {
  static readonly status = `${StatusCodes.NOT_IMPLEMENTED}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'not-implemented',
      code: normalizedParams.code ?? 'NOT_IMPLEMENTED',
      status: NotImplementedError.status,
      title: normalizedParams.title ?? 'Not Implemented',
      detail: normalizedParams.detail ?? 'This functionality is not implemented yet.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
