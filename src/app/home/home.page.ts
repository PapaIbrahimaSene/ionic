import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Chantier } from '../chantier';
import { ApiService } from '../providers/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  chantier: Chantier[] = [];

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getProducts().subscribe(
      res => {
        this.chantier = res;
        console.log(this.chantier);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  addProduct() {
    this.router.navigate(['/chantier-add']);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chantier, event.previousIndex, event.currentIndex);
  }
}
