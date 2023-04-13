import {Post} from "../../models/posts.model";

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [
    {id: 1, title: 'Sample Title 1', description: 'Sample description1'},
    {id: 2, title: 'Sample Title 2', description: 'Sample description2'},
    {id: 3, title: 'Sample Title 3', description: 'Sample description3'},
  ]
}
