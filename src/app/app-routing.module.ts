import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { DataResolverService } from "./services/resolver/data-resolver.service";

const routes: Routes = [
  { path: "", loadChildren: "./pages/tabs/tabs.module#TabsPageModule" },
  { path: "about", loadChildren: "./pages/about/about.module#AboutPageModule" },
  {
    path: "account-add",
    loadChildren: "./pages/account-add/account-add.module#AccountAddPageModule"
  },
  {
    path: "account-import-onboarding/:id",
    resolve: {
      special: DataResolverService
    },
    loadChildren:
      "./pages/account-import-onboarding/account-import-onboarding.module#AccountImportOnboardingPageModule"
  },
  {
    path: "select-wallet",
    loadChildren:
      "./pages/select-wallet/select-wallet.module#SelectWalletPageModule"
  },
  {
    path: "account-import/:id",
    resolve: {
      special: DataResolverService
    },
    loadChildren:
      "./pages/account-import/account-import.module#AccountImportPageModule"
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
