import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { UserComponent } from "../users/user/user.component";
import { UsersComponent } from "../users/users.component";
import { ServersComponent } from "../servers/servers.component";
import { ServerComponent } from "../servers/server/server.component";
import { EditServerComponent } from "../servers/edit-server/edit-server.component";
import { PageNotfoundComponent } from "../page-notfound/page-notfound.component";
import { AuthGuardService } from "../app-authguard.service";
import { CanDeactivateGuard } from "../servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { ServerResolver } from "../servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:username", component: UserComponent }],
  },
  {
    path: "servers",
    component: ServersComponent,
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: {
          server: ServerResolver,
        },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  {
    path: "not-found",
    component: PageNotfoundComponent,
  },
  {
    path: "error",
    component: ErrorPageComponent,
    data: {
      message: "Error on this Page",
    },
  },
  {
    path: "**",
    redirectTo: "/not-found",
  },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, { useHash: true }),
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
