import { api } from "./api"

export const getImages = async ({
  query,
  page,
}: {
  query: string
  page: number
}) => {
  console.log("TEST fetchImage START") //TODO:
  const response = await api.getImages({ query, page })
  if (response.kind === "ok") {
    return {
      images: response.images,
      page: response.page,
      totalPages: response.totalPages,
    }
  } else {
    console.log(`[ERROR] fetchImages: ${JSON.stringify(response)}`)
    throw Error(response.kind)
  }
}

