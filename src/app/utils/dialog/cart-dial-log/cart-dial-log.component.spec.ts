import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDialLogComponent } from './cart-dial-log.component';

describe('CartDialLogComponent', () => {
  let component: CartDialLogComponent;
  let fixture: ComponentFixture<CartDialLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDialLogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDialLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
