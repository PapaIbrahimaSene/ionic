import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../providers/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-chantier-edit',
  templateUrl: './chantier-edit.page.html',
  styleUrls: ['./chantier-edit.page.scss']
})
export class ChantierEditPage implements OnInit {
  productForm: FormGroup;
  chantierId = '';
  chantierNom = '';
  prod_desc = '';
  prod_price: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      chantierNom: [null, Validators.required],
      prod_desc: [null, Validators.required],
      prod_price: [null, Validators.required]
    });
  }

  getProduct(id: any) {
    this.api.getProduct(id).subscribe((data: any) => {
      this.chantierId = data.chantierId;
      this.productForm.setValue({
        chantierNom: data.chantierNom,
        prod_desc: data.prod_desc,
        prod_price: data.prod_price
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateProduct(this.chantierId, this.productForm.value).subscribe(
      (res: any) => {
        const id = res.chantierId;
        this.isLoadingResults = false;
        this.router.navigate(['/chantier-details', id]);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  productDetails() {
    this.router.navigate(['/chantier-details', this.chantierId]);
  }
}
