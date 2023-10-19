export interface ApiGetUnsplashImage {
  results: ApiUnsplashImage[]
  total: number
  total_pages: number
}

interface ApiUnsplashImage {
  id: string
  slug: string
  created_at: string
  updated_at: string
  promoted_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  description: string
  alt_description: string
  breadcrumbs: {
    slug: string
    title: string
    index: number
    type: string
  }[]
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
  links: {
    self: string
    html: string
    download: string
    download_location: string
  }
  likes: number
  liked_by_user: boolean
  current_user_collections: unknown[]
  sponsorship: unknown
  topic_submissions: unknown
  user: {
    id: string
    updated_at: string
    username: string
    name: string
    first_name: string
    last_name: string
    twitter_username: string
    portfolio_url: string | null
    bio: string | null
    location: string
    links: {
      self: string
      html: string
      photos: string
      likes: string
      portfolio: string
      following: string
      followers: string
    }
    profile_image: {
      small: string
      medium: string
      large: string
    }
    instagram_username: string
    total_collections: number
    total_likes: number
    total_photos: number
    accepted_tos: boolean
    for_hire: boolean
    social: {
      instagram_username: string
      portfolio_url: string | null
      twitter_username: string
      paypal_email: string | null
    }
  }
  tags: {
    type: string
    title: string
    source: {
      ancestry: {
        type: {
          slug: string
          pretty_slug: string
        }
        category: {
          slug: string
          pretty_slug: string
        }
        subcategory: {
          slug: string
          pretty_slug: string
        }
        title: string
        subtitle: string
        description: string
        meta_title: string
        meta_description: string
        cover_photo: {
          id: string
          slug: string
          created_at: string
          updated_at: string
          promoted_at: string
          width: number
          height: number
          color: string
          blur_hash: string
          description: string
          alt_description: string
          urls: {
            raw: string
            full: string
            regular: string
            small: string
            thumb: string
            small_s3: string
          }
          links: {
            self: string
            html: string
            download: string
            download_location: string
          }
          likes: number
          liked_by_user: boolean
          current_user_collections: unknown[]
          sponsorship: unknown
          topic_submissions: unknown
          premium: boolean
          plus: boolean
          user: {
            id: string
            updated_at: string
            username: string
            name: string
            first_name: string
            last_name: string
            twitter_username: string
            portfolio_url: string | null
            bio: string
            location: string
            links: {
              self: string
              html: string
              photos: string
              likes: string
              portfolio: string
              following: string
              followers: string
            }
            profile_image: {
              small: string
              medium: string
              large: string
            }
            instagram_username: string
            total_collections: number
            total_likes: number
            total_photos: number
            accepted_tos: boolean
            for_hire: boolean
            social: {
              instagram_username: string
              portfolio_url: string | null
              twitter_username: string
              paypal_email: string | null
            }
          }
        }
      }
    }
  }[]
}

