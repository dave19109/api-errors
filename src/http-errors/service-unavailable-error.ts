import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "503 Service Unavailable" error in JSON:API format.
 */
export class ServiceUnavailableError extends ApiError {
  static readonly status = `${StatusCodes.SERVICE_UNAVAILABLE}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'service-unavailable',
      code: normalizedParams.code ?? 'SERVICE_UNAVAILABLE',
      status: ServiceUnavailableError.status,
      title: normalizedParams.title ?? 'Service Unavailable',
      detail: normalizedParams.detail ?? 'The service is temporarily unavailable.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
