import { Movie } from "./movie"
import { UserList } from "./userlist"

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

  export namespace SignUp {
    export type Request = {
      name: string,
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

  export namespace GetUserList {
    export type Request = void

    export type Response = UserList
  }

  export namespace AddMovie {
    export type Request = { movieId: string }

    export type Response = { newMovie: string }
  }

  export namespace RemoveMovie {
    export type Request = { movieId: string }

    export type Response = { removedMovie: string }
  }

  export namespace SearchMovie {
    export type Request = { query: string }

    export type Response = { 
      _id: number,
      title: string,
     }[]
  }
}