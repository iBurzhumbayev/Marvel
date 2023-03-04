export interface IUser {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string
}

export interface IPost {
    title: string;
    body: string;
    id: number;
    userId: number
}

export interface IComment {
    email: string;
    name: string;
    body: string;
    id: number;
    postId: number
}

export interface Character {
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
  }