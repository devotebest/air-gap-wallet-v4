import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TabsPageRoutingModule } from './tabs.router.module'
import { TranslateModule } from '@ngx-translate/core'
import { TabsPage } from './tabs.page'
import { IntroductionPageModule } from '../introduction/introdution.module'

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule, TranslateModule, IntroductionPageModule],
  declarations: [TabsPage]
})
export class TabsPageModule {}
