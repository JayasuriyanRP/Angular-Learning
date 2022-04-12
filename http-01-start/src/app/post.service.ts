import { Injectable } from "@angular/core";
import { IPost } from "./post.model";
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { map, tap, catchError } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  errorSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(postData: IPost) {
    // Send Http request
    console.log(postData);

    this.http
      .post<{ name: string }>(
        "https://first-angular-demo-app-dec5c-default-rtdb.firebaseio.com/posts.json",
        postData,
        {
          headers: new HttpHeaders({
            CustomHeader: "hello",
          }),
          observe: "response",
          responseType: "json",
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.errorSubject.next(error);
        }
      );
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "pretty");
    return this.http
      .get<{ [key: string]: IPost }>(
        "https://first-angular-demo-app-dec5c-default-rtdb.firebaseio.com/posts.json",
        {
          params: searchParams,
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: IPost[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key))
              postsArray.push({ ...responseData[key], id: key });
          }

          console.log(postsArray);
          return postsArray;
        }),
        catchError((errorResponse) => {
          console.log(errorResponse);
          return  throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://first-angular-demo-app-dec5c-default-rtdb.firebaseio.com/posts.json",
        {
          observe: "events",
        }
      )
      .pipe(
        tap((e) => {
          console.log(e);

          if (e.type === HttpEventType.Response) {
            console.log("Response recieved" + e.body);
          }
        })
      );
  }
}
