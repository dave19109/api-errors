import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "410 Gone" error in JSON:API format.
 */
export class GoneError extends ApiError {
  static readonly status = `${StatusCodes.GONE}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'gone',
      code: normalizedParams.code ?? 'GONE',
      status: GoneError.status,
      title: normalizedParams.title ?? 'Gone',
      detail: normalizedParams.detail ?? 'The requested resource is no longer available.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
