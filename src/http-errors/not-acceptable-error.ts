import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "406 Not Acceptable" error in JSON:API format.
 */
export class NotAcceptableError extends ApiError {
  static readonly status = `${StatusCodes.NOT_ACCEPTABLE}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'not-acceptable',
      code: normalizedParams.code ?? 'NOT_ACCEPTABLE',
      status: NotAcceptableError.status,
      title: normalizedParams.title ?? 'Not Acceptable',
      detail: normalizedParams.detail ?? 'The requested response format is not supported.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
