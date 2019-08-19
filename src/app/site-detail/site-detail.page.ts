import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Chantier } from '../chantier';
import { ApiService } from '../providers/api/api.service';

@Component({
  selector: 'app-chantier-detail',
  templateUrl: './chantier-detail.page.html',
  styleUrls: ['./chantier-detail.page.scss']
})
export class ProductDetailPage implements OnInit {
  chantier: Chantier = {
    chantierId: null,
    chantierNom: '',
    prod_desc: '',
    prod_price: null,
    updated_at: null
  };
  isLoadingResults = false;

  constructor(
    public api: ApiService,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  async getProduct() {
    if (this.route.snapshot.paramMap.get('id') === 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
      this.isLoadingResults = true;
      await this.api
        .getProduct(this.route.snapshot.paramMap.get('id'))
        .subscribe(
          res => {
            console.log(res);
            this.chantier = res;
            this.isLoadingResults = false;
          },
          err => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteProduct(id: any) {
    this.isLoadingResults = true;
    await this.api.deleteProduct(id).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  editProduct(id: any) {
    this.router.navigate(['/chantier-edit', id]);
  }
}
