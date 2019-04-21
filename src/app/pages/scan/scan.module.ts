import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { ScanPage } from "./scan";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ZXingScannerModule,
    RouterModule.forChild([{ path: "", component: ScanPage }])
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
