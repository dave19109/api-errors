/**
 * The JSON:API Error links object.
 * @see https://jsonapi.org/format/1.1/#error-objects
 */
export interface ApiErrorLink {
  readonly about: string
}

/**
 * The JSON:API Error source object.
 * @see https://jsonapi.org/format/1.1/#error-objects
 */
export interface ApiErrorSource {
  readonly pointer?: string
  readonly parameter?: string
}

/**
 * The JSON:API Error meta object.
 * @see https://jsonapi.org/format/1.1/#error-objects
 */
export type ApiErrorMeta = Record<string, unknown>

/**
 * The JSON:API Error object.
 * @see https://jsonapi.org/format/1.1/#error-objects
 */
export interface ApiErrorObject {
  readonly id: string
  readonly link?: ApiErrorLink
  readonly status: `${number}`
  readonly code: string
  readonly title: string
  readonly detail: string
  readonly source?: ApiErrorSource
  readonly meta?: ApiErrorMeta
}

/**
 * The JSON:API Error initialization parameters.
 * @see https://jsonapi.org/format/1.1/#error-objects
 */
export type ApiErrorInit = {
  readonly id?: string
  readonly link?: ApiErrorLink
  readonly status?: `${number}`
  readonly code?: string
  readonly title?: string
  readonly detail?: string
  readonly source?: ApiErrorSource
  readonly meta?: ApiErrorMeta
}

export type ApiErrorParams =
  | (Omit<ApiErrorInit, 'status' | 'code' | 'title'> & Partial<Pick<ApiErrorInit, 'code' | 'title'>>)
  | string

/**
 * The JSON:API body response containing error objects.
 * @see https://jsonapi.org/format/1.1/#error-objects
 */
export interface ApiErrorResponse {
  readonly errors: ApiErrorObject[]
}
