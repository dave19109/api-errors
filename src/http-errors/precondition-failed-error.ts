import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "412 Precondition Failed" error in JSON:API format.
 */
export class PreconditionFailedError extends ApiError {
  static readonly status = `${StatusCodes.PRECONDITION_FAILED}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'precondition-failed',
      code: normalizedParams.code ?? 'PRECONDITION_FAILED',
      status: PreconditionFailedError.status,
      title: normalizedParams.title ?? 'Precondition Failed',
      detail: normalizedParams.detail ?? 'One or more request preconditions were not met.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
