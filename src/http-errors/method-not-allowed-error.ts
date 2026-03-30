import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "405 Method Not Allowed" error in JSON:API format.
 */
export class MethodNotAllowedError extends ApiError {
  static readonly status = `${StatusCodes.METHOD_NOT_ALLOWED}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'method-not-allowed',
      code: normalizedParams.code ?? 'METHOD_NOT_ALLOWED',
      status: MethodNotAllowedError.status,
      title: normalizedParams.title ?? 'Method Not Allowed',
      detail: normalizedParams.detail ?? 'The HTTP method is not allowed for this resource.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
