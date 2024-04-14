import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarousalComponent } from './homepage-carousal.component';

describe('HomepageCarousalComponent', () => {
  let component: HomepageCarousalComponent;
  let fixture: ComponentFixture<HomepageCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageCarousalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
