import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "504 Gateway Timeout" error in JSON:API format.
 */
export class GatewayTimeoutError extends ApiError {
  static readonly status = `${StatusCodes.GATEWAY_TIMEOUT}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'gateway-timeout',
      code: normalizedParams.code ?? 'GATEWAY_TIMEOUT',
      status: GatewayTimeoutError.status,
      title: normalizedParams.title ?? 'Gateway Timeout',
      detail: normalizedParams.detail ?? 'The upstream server took too long to respond.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
