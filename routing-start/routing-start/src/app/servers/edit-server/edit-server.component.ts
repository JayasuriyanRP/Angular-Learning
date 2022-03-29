import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute } from "@angular/router";
import { ICanComponentDeactivate } from "./can-deactivate-guard.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, ICanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
    console.log(this.route.snapshot.queryParams);
    console.log("ID:" + this.route.snapshot.params["id"]);

    this.server = this.serversService.getServer(
      +this.route.snapshot.params["id"]
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.queryParams.subscribe((params) => {
      this.allowEdit = params["allowEdit"] === "1" ? true : false;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Can Deactivate Called");
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm("Unsaved changes are present. Do you want to Exit?");
    } else {
      return true;
    }
  }
}
