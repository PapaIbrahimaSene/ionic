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
import { Router } from '@angular/router';

import { ApiService } from '../providers/api/api.service';

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
  selector: 'app-chantier-add',
  templateUrl: './chantier-add.page.html',
  styleUrls: ['./chantier-add.page.scss']
})
export class ProductAddPage implements OnInit {
  productForm: FormGroup;
  chantierNom = '';
  prod_desc = '';
  prod_price: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      chantierNom: [null, Validators.required],
      prod_desc: [null, Validators.required],
      prod_price: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addProduct(this.productForm.value).subscribe(
      (res: any) => {
        const id = res.chantierId;
        this.isLoadingResults = false;
        this.router.navigate(['/chantier-detail', id]);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
