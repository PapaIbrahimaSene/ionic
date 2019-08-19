import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PresentationPage } from './presentation.page';

describe('HomePage', () => {
  let component: PresentationPage;
  let fixture: ComponentFixture<PresentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
