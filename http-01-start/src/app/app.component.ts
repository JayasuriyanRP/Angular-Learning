import { Component, OnInit, OnDestroy } from "@angular/core";
import { IPost } from "./post.model";
import { PostService } from "./post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: IPost[] = [];
  isFetching: boolean;
  error = null;
  errorSubscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
    this.errorSubscription = this.postService.errorSubject.subscribe(
      (error) => {
        this.error = error;
      }
    );
  }

  onCreatePost(postData: IPost) {
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      (post) => {
        this.loadedPosts = post;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.error.error + error.message;
      }
    );
    // Send Http request
  }

  onClearPosts() {
    this.isFetching = true;
    this.postService.deletePosts().subscribe((post) => {
      this.loadedPosts = [];
      this.isFetching = false;
    });
    // Send Http request
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
