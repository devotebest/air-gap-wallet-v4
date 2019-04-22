import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { TransactionPreparePage } from "./transaction-prepare";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild([{ path: "", component: TransactionPreparePage }])
  ],
  declarations: [TransactionPreparePage]
})
export class TransactionPreparePageModule {}
