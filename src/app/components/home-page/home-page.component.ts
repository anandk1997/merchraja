import { NavbarComponent } from './../../utils/templates/navbar/navbar.component';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../service/dataSharingComponentService/data.service';
import { HomepageCarousalComponent } from '../../utils/templates/homepage-carousal/homepage-carousal.component';
import { CommonModule } from '@angular/common';
import { MobileNavbarComponent } from '../../utils/templates/mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    HomepageCarousalComponent,
    CommonModule,
    MobileNavbarComponent,
  ],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit {
  public featuredCategories: Array<any> = [
    {
      img: '../../../assets/beauty.svg',
      name: 'Beauty',
    },
    {
      img: '../../../assets/Education.svg',
      name: 'Education',
    },
    {
      img: '../../../assets/business.svg',
      name: 'Business',
    },
    {
      img: '../../../assets/comedy.svg',
      name: 'Comedy',
    },
    {
      img: '../../../assets/Fashion.svg',
      name: 'Fashion',
    },
    {
      img: '../../../assets/Lifestyle.svg',
      name: 'Lifestyle',
    },
    {
      img: '../../../assets/Music.svg',
      name: 'Music',
    },
    {
      img: '../../../assets/gaming.svg',
      name: 'Gaming',
    },
  ];
  private width: number = 13.6;
  private count: number = 0;
  public carousalCard: Array<any> = [
    {
      name: 'anything',
      summary:
        'asjdqwenqeklqjeljqklejqwlkjeklqjiasucopaiwkeqopeiopwieopklxcjqooqwpeiqwieoopqweioqwiepoqeoqekacnz,xmcn',
    },
    {
      name: 'anything1',
      summary:
        'asjdqwenqeklqjeljqklejqwlkjeklqjiasucopaiwkeqopeiopwieopklxcjqooqwpeiqwieoopqweioqwiepoqeoqekacnz,xmcn',
    },
    {
      name: 'anything2',
      summary:
        'asjdqwenqeklqjeljqklejqwlkjeklqjiasucopaiwkeqopeiopwieopklxcjqooqwpeiqwieoopqweioqwiepoqeoqekacnz,xmcn',
    },
  ];
  isMobile: boolean = false;
  constructor(
    private el: ElementRef,
    private changeDetection: ChangeDetectorRef,
    private dataSharingService: DataService,
  ) {}

  scrollTo(element: string) {
    const form = this.el.nativeElement.querySelector(`${element}`);
    if (form) {
      const rect = form.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth', // optional: adds smooth scrolling effect
      });
    }
  }

  ngAfterViewInit(): void {
    console.log(1);

    this.dataSharingService.element$.subscribe((element) => {
      if (element) {
        this.scrollTo(element);
      }
    });
    switch (true) {
      case window.innerWidth <= 425:
        const cards = this.el.nativeElement.querySelectorAll('.card');
        cards[0].style.display = 'none';
        cards[2].style.display = 'none';
        cards[1].style.width = '75svw';
        cards[1].style.zIndex = '1';
        this.isMobile = true;
        this.width = 28;
        break;
      default:
        this.isMobile = false;
        const carousalCard = this.el.nativeElement.querySelectorAll('.card');
        carousalCard[1].style.width = '40svw';
        carousalCard[1].style.zIndex = '1';
        carousalCard[1].style.transform = 'translateX(0%)';
        carousalCard[0].style.transform = 'translateX(-44%)';
        carousalCard[2].style.transform = 'translateX(44%)';
        this.width = 13.6;
        break;
    }
    const prevButton = this.el.nativeElement.querySelector('.prev');
    prevButton.style.display = 'none';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    switch (true) {
      case window.innerWidth <= 425:
        const cards = this.el.nativeElement.querySelectorAll('.card');
        cards[0].style.display = 'none';
        cards[2].style.display = 'none';
        cards[1].style.width = '75svw';
        this.isMobile = true;
        this.width = 28;
        break;
      default:
        const carousalCard = this.el.nativeElement.querySelectorAll('.card');
        this.isMobile = false;
        carousalCard[1].style.width = '40svw';
        carousalCard[1].style.zIndex = '1';
        carousalCard[1].style.transform = 'translateX(0%)';
        carousalCard[0].style.transform = 'translateX(-44%)';
        carousalCard[2].style.transform = 'translateX(44%)';
        carousalCard[2].style.display = 'flex';
        carousalCard[0].style.display = 'flex';
        this.width = 13.6;
        break;
    }
  }
  nextCard() {
    this.slideCard('next');
  }
  prevCard() {
    this.slideCard('prev');
  }

  slideCard(check: string) {
    const cards = this.el.nativeElement.querySelectorAll('.card');
    const cardWithZIndexOne: any = Array.from(cards).find((card: any) => {
      const zIndex = window.getComputedStyle(card).zIndex;
      return zIndex === '1';
    });
    const totalCards = cards.length;
    const currentIndex = Array.from(cards).indexOf(cardWithZIndexOne);
    const nextIndex = (currentIndex + 1) % totalCards;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextCard = cards[nextIndex];
    const prevCard = cards[prevIndex];
    check === 'next'
      ? (nextCard.style.transform = 'translateX(0%)')
      : (nextCard.style.transform = 'translateX(-44%)');
    check === 'next'
      ? (cardWithZIndexOne.style.transform = 'translateX(-44%)')
      : (prevCard.style.transform = 'translateX(0%)');
    cardWithZIndexOne.style.zIndex = '0';
    check === 'next'
      ? (nextCard.style.zIndex = '1')
      : (prevCard.style.zIndex = '1');
    check === 'next'
      ? (prevCard.style.transform = 'translateX(44%)')
      : (cardWithZIndexOne.style.transform = 'translateX(44%)');
    if (this.isMobile) {
      cardWithZIndexOne.style.display = 'flex';
      cardWithZIndexOne.style.width = '75svw';
      cardWithZIndexOne.style.transform = 'none';
      nextCard.style.display = 'none';
      prevCard.style.display = 'none';
    }
    this.changeDetection.detectChanges();
  }

  next() {
    this.count++;
    const prevButton = this.el.nativeElement.querySelector('.prev');
    prevButton.style.display = 'block';
    this.slide(this.count);
    this.featuredCategories.push(this.featuredCategories[this.count]);
  }

  slide(i: number) {
    const container = this.el.nativeElement.querySelector(
      '.featuredCategoryCarousal',
    );
    container.style.left = `-${i * this.width}svw`;
  }

  prev() {
    if (this.count === 0) {
      const prevButton = this.el.nativeElement.querySelector('.prev');
      prevButton.style.display = 'none';
    }
    this.count--;
    this.slide(this.count);
    this.featuredCategories.slice(-1);
  }
}
