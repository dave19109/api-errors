import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "409 Conflict" error in JSON:API format.
 */
export class ConflictError extends ApiError {
  static readonly status = `${StatusCodes.CONFLICT}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'conflict',
      code: normalizedParams.code ?? 'CONFLICT',
      status: ConflictError.status,
      title: normalizedParams.title ?? 'Conflict',
      detail: normalizedParams.detail ?? 'The request conflicts with the current state of the resource.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
