import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVendorComponent } from './list-vendor.component';

describe('ListVendorComponent', () => {
  let component: ListVendorComponent;
  let fixture: ComponentFixture<ListVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVendorComponent]
    });
    fixture = TestBed.createComponent(ListVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
