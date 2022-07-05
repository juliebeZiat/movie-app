import { Movie } from "./movie"

export namespace Endpoints {
  export namespace Login {
    export type Request = {
      email: string,
      password: string
    }

    export type Response = {
      access_token: string
    }
  }

  export namespace ListMovies {
    export type Request = void

    export type Response = Movie[]
  }

  export namespace GetMovie {
    export type Request = {
      movieId: string
    }

    export type Response = Movie
  }
}