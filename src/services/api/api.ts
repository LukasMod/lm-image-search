import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { ApiGetUnsplashImage, UnsplashImage } from "../../types"
import type { ApiConfig } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

//TODO: move to env
// const UNSPLASH_ACCESS_KEY = "ToqfSL8J6uEJ-XLTUDYpUPPm_ZB4Yaeb7fgdJhRWGDg"
const UNSPLASH_ACCESS_KEY = "bhAmnP7lxP1iNWn6ihYkdp02CTNDEgRzxXLQ3azg09M"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: "https://api.unsplash.com",
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    })
  }

  async getImages({
    query,
    page = 1,
    perPage = 6,
  }: {
    query: string
    page?: number
    perPage?: number
  }): Promise<
    | { kind: "ok"; images: UnsplashImage[]; page: number; totalPages: number }
    | GeneralApiProblem
  > {
    const response: ApiResponse<ApiGetUnsplashImage> = await this.apisauce.get(
      `/search/photos`,
      { query, page, per_page: perPage }
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const images: UnsplashImage[] =
        response.data?.results.map((el) => {
          return {
            id: el.id,
            urls: {
              full: el.urls.full,
              regular: el.urls.regular,
              small: el.urls.small,
            },
            aspectRatio: el.width / el.height,
          }
        }) || []

      return {
        kind: "ok",
        images,
        page,
        totalPages: response.data?.total_pages || 0,
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

export const api = new Api()

