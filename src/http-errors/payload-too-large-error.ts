import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "413 Payload Too Large" error in JSON:API format.
 */
export class PayloadTooLargeError extends ApiError {
  static readonly status = `${StatusCodes.REQUEST_TOO_LONG}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'payload-too-large',
      code: normalizedParams.code ?? 'PAYLOAD_TOO_LARGE',
      status: PayloadTooLargeError.status,
      title: normalizedParams.title ?? 'Payload Too Large',
      detail: normalizedParams.detail ?? 'The request payload exceeds the allowed size limit.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
