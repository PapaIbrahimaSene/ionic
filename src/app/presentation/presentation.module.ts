import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PresentationPage } from './presentation.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PresentationPage
      }
    ]),
    TranslateModule.forChild(),

  ],
  declarations: [PresentationPage]

})
export class PresentationPageModule { }
