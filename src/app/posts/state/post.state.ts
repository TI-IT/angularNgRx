import {Post} from "../../models/posts.model";

export interface PostState {
  posts: Post[] | null;
}

export const initialState: PostState = {
  posts: null,
}
