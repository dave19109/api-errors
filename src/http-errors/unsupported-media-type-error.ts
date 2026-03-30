import { StatusCodes } from 'http-status-codes'

import { ApiError } from '../core/api-error'
import type { ApiErrorParams } from '../core/types'

/**
 * Represents a "415 Unsupported Media Type" error in JSON:API format.
 */
export class UnsupportedMediaTypeError extends ApiError {
  static readonly status = `${StatusCodes.UNSUPPORTED_MEDIA_TYPE}`

  constructor(params: ApiErrorParams) {
    const normalizedParams =
      typeof params === 'string'
        ? {
            detail: params
          }
        : params

    super({
      id: normalizedParams.id ?? 'unsupported-media-type',
      code: normalizedParams.code ?? 'UNSUPPORTED_MEDIA_TYPE',
      status: UnsupportedMediaTypeError.status,
      title: normalizedParams.title ?? 'Unsupported Media Type',
      detail: normalizedParams.detail ?? 'The request media type is not supported.',
      link: normalizedParams.link,
      meta: normalizedParams.meta,
      source: normalizedParams.source
    })
  }
}
