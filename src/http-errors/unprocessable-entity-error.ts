import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "422 Unprocessable Entity" error in JSON:API format.
 */
export class UnprocessableEntityError extends ApiError {
  static readonly status = `${StatusCodes.UNPROCESSABLE_ENTITY}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'unprocessable-entity',
      code: normalizedParams.code ?? 'UNPROCESSABLE_ENTITY',
      status: UnprocessableEntityError.status,
      title: normalizedParams.title ?? 'Unprocessable Entity',
      detail: normalizedParams.detail ?? 'The request payload is syntactically correct but semantically invalid.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
