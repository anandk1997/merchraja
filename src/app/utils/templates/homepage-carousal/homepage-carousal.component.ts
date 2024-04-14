import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-homepage-carousal',
  standalone: true,
  imports: [],
  templateUrl: './homepage-carousal.component.html',
  styleUrl: './homepage-carousal.component.scss',
})
export class HomepageCarousalComponent {
  public imgArr: Array<string> = [
    '../../../../assets/UI_banner_2 1.jpg',
    '../../../../assets/UI_banner_2 1.jpg',
  ];
  private interval!: any;
  constructor(
    private el: ElementRef,
    private changeDetection: ChangeDetectorRef,
  ) {}
  ngAfterViewInit(): void {
    let count = 0;
    this.interval = setInterval(() => {
      this.imgArr = this.imgArr.concat(this.imgArr[count].trim());
      this.imgArr.slice(1);
      this.changeDetection.detectChanges();
      count++;
      this.slide(count);
    }, 5000);
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  slide(i: number) {
    const container = this.el.nativeElement.querySelector('.slide');
    container.style.left = `-${i * 100}svw`;
  }
}
