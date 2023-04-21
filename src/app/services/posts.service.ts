import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {Post} from '../models/posts.model'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `https://tiit-36c09-default-rtdb.firebaseio.com/posts.json`,
    ).pipe(
      map((data) => {
        const posts: Post[] = []
        for (let key in data) {
          posts.push({...data[key], id: +key})
        }
        return posts
      }),
    )
  }

  addPost(post: Post) {
    return this.http.post(
      `https://tiit-36c09-default-rtdb.firebaseio.com/posts.json`,
      post,
    )
  }
}
