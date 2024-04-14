import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbesComponent } from './breadcrumbes.component';

describe('BreadcrumbesComponent', () => {
  let component: BreadcrumbesComponent;
  let fixture: ComponentFixture<BreadcrumbesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
