import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Router } from "@angular/router";
import { server } from "./server.model";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: server;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // let serverId = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(serverId);
    // console.log(serverId);

    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   this.server = this.serversService.getServer(+params["id"]);
    // });
    // console.log(this.server);

    this.route.data.subscribe((resolver) => {
      this.server = resolver["server"];
    });
  }

  onEditServer() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
