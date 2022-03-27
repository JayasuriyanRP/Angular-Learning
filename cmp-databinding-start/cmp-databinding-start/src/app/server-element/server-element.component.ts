import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input("serverElement") element: {
    type: string;
    name: string;
    content: string;
  };

  @ViewChild("heading", { static: true }) headerElementRef: ElementRef;
  @ContentChild("contentElement", { static: true })
  contentElementRef: ElementRef;

  @Input()
  name: string;

  constructor() {
    console.log("Constructor Called!");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges Called!");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit Called!");
    console.log(this.headerElementRef.nativeElement.textContent);
    console.log(
      "ContentElement on Init--> " +
        this.contentElementRef.nativeElement.textContent
    );
  }

  ngDoCheck(): void {
    console.log("ngDoCheck Called!");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit Called!");
    console.log(
      "ContentElement --> " + this.contentElementRef.nativeElement.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked Called!");
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    console.log(
      "AfterViewInit -> " + this.headerElementRef.nativeElement.textContent
    );
    console.log(
      "ContentElement From View Init--> " +
        this.contentElementRef.nativeElement.textContent
    );
  }

  ngOnDestroy(): void {
    console.log("On Destroy Called");
  }
}
