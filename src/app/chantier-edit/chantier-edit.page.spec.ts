import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ChantierEditPage } from './chantier-edit.page';

describe('ChantierEditPage', () => {
  let component: ChantierEditPage;
  let fixture: ComponentFixture<ChantierEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChantierEditPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantierEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
