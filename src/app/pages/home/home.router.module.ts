import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";
import { IntroductionPage } from "../introduction/introduction";
import { PortfolioPage } from "../portfolio/portfolio";
import { ScanPage } from "../scan/scan";
import { SettingsPage } from "../settings/settings";
import { ExchangePage } from "../exchange/exchange";

const routes: Routes = [
  {
    path: "tabs",
    component: HomePage,
    children: [
      {
        path: "tab1",
        children: [
          {
            path: "",
            component: PortfolioPage
          }
        ]
      },
      {
        path: "tab2",
        children: [
          {
            path: "",
            component: ScanPage
          }
        ]
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            component: SettingsPage
          }
        ]
      },
      {
        path: "tab4",
        children: [
          {
            path: "",
            component: ExchangePage
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/tab1",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
