import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
  icon: string;
}

@Component({
  selector: 'app-presentation',
  templateUrl: 'presentation.page.html',
  styleUrls: ['./presentation.page.scss']
})
export class PresentationPage {
  slides: Slide[];
  showSkip = true;

  constructor(
    private router: Router,
    public menu: MenuController,
    translate: TranslateService
  ) {
    translate
      .get([
        'PRESENTATION_SLIDE1_TITLE',
        'PRESENTATION_SLIDE1_DESCRIPTION',
        'PRESENTATION_SLIDE2_TITLE',
        'PRESENTATION_SLIDE2_DESCRIPTION',
        'PRESENTATION_SLIDE3_TITLE',
        'PRESENTATION_SLIDE3_DESCRIPTION',
        'PRESENTATION_SLIDE4_TITLE',
        'PRESENTATION_SLIDE4_DESCRIPTION'
      ])
      .subscribe(values => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.PRESENTATION_SLIDE1_TITLE,
            description: values.PRESENTATION_SLIDE1_DESCRIPTION,
            image: 'assets/img/visualhq_qr.svg',
            icon: 'assets/img/icon_hq.svg'
          },
          {
            title: values.PRESENTATION_SLIDE2_TITLE,
            description: values.PRESENTATION_SLIDE2_DESCRIPTION,
            image: 'assets/img/visualhq_qr.svg',
            icon: 'assets/img/icon_hq.svg'
          },
          {
            title: values.PRESENTATION_SLIDE3_TITLE,
            description: values.PRESENTATION_SLIDE3_DESCRIPTION,
            image: 'assets/img/visualhq_qr.svg',
            icon: 'assets/img/icon_hq.svg'
          },
          {
            title: values.PRESENTATION_SLIDE4_TITLE,
            description: values.PRESENTATION_SLIDE4_DESCRIPTION,
            image: 'assets/img/visualhq_qr.svg',
            icon: 'assets/img/icon_hq.svg'
          }
        ];
      });
  }

  startApp() {
    this.router.navigate(['WelcomePage']);
  }

  backToPresentation() {
    this.router.navigate(['PresentationPage']);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
