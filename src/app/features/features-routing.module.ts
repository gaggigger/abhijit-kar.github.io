import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./home/home.module#HomeModule" },
  { path: "about", loadChildren: "./about/about.module#AboutModule" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}