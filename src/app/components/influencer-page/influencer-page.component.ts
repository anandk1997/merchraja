import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-influencer-page',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './influencer-page.component.html',
  styleUrl: './influencer-page.component.scss',
})
export class InfluencerPageComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private nextSlide: number = 0;
  public DesktopimgArr: Array<string> = [
    '../../../assets/temp/Slide 1.png',
    '../../../assets/temp/Slide 2.png',
    '../../../assets/temp/Slide 3.png',
    '../../../assets/temp/Slide 4.png',
    '../../../assets/temp/Slide 5.png',
    '../../../assets/temp/Slide 6.png',
  ];
  public mobileimgArr: Array<string> = [
    '../../../assets/temp/MobileSlide 1.png',
    '../../../assets/temp/MobileSlide 2.png',
    '../../../assets/temp/MobileSlide 3.png',
    '../../../assets/temp/MobileSlide 4.png',
    '../../../assets/temp/MobileSlide 5.png',
    '../../../assets/temp/MobileSlide 6.png',
  ];
  public multipleForms!: FormGroup;
  public currentFormIndex: number = 0;
  public imgArr: Array<string> = [];
  public formValidities = {
    firstForm: false,
    secondForm: false,
    thirdForm: false,
    fourthForm: false,
    fifthForm: false,
  };
  public interval!: any;
  public width: number = 117;
  public pause: boolean = true;
  public count: number = 0;
  public formCount: number = 0;
  constructor(
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}
  ngOnDestroy(): void {
    this.observer.disconnect();
    clearInterval(this.interval);
  }

  sendMail(data: string) {
    emailjs
      .send(
        'service_71m6l34',
        'template_ihk2aa3',
        {
          message: data,
          reply_to: 'Karan@merchraja.com',
        },
        'Ik4omSySQTFoUSgNV',
      )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mouseEnter(element: string, text: string) {
    const wholeDiv = this.el.nativeElement.querySelector(element);
    const header = this.el.nativeElement.querySelector(`${element} span`);
    const isRotated = wholeDiv.classList.contains('rotated');
    const line = this.el.nativeElement.querySelector(`${element} .line`);
    const icon = this.el.nativeElement.querySelector(`${element} .cardLogo`);
    if (!isRotated) {
      wholeDiv.classList.add('rotated');
      header.style.display = 'none';
      line.style.display = 'none';
      icon.style.display = 'none';
      const existingDiv = wholeDiv.querySelector('.new-content');
      if (!existingDiv) {
        // Create a new <div> element
        const newElement = this.renderer.createElement('div');
        this.renderer.addClass(newElement, 'new-content'); // Add a class to the new div
        const newText = this.renderer.createText(text);
        this.renderer.appendChild(newElement, newText);
        this.renderer.appendChild(wholeDiv, newElement);
      }
    } else {
      wholeDiv.classList.remove('rotated');
      header.classList.remove('rotated');
      const existingDiv = wholeDiv.querySelector('.new-content');
      header.style.display = 'block';
      line.style.display = 'block';
      icon.style.display = 'flex';
      this.renderer.removeChild(wholeDiv, existingDiv); // Remove the element with the class new-content
    }
  }

  scrollTo() {
    const form = this.el.nativeElement.querySelector(`#formSection`);
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

  ngOnInit() {
    switch (true) {
      case window.innerWidth <= 376:
        this.width = 51.3;
        this.imgArr = this.mobileimgArr;
        break;
      case window.innerWidth <= 425:
        this.imgArr = this.mobileimgArr;
        this.width = 54.5;
        break;
      default:
        this.width = 117;
        this.imgArr = this.DesktopimgArr;
        break;
    }
    this.multipleForms = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]],
      }),
      socialLinks: this.formBuilder.group({
        instagram: ['', [Validators.required]],
        facebook: ['', [Validators.required]],
        twitter: ['', [Validators.required]],
        youtube: ['', [Validators.required]],
        linkedin: ['', [Validators.required]],
      }),
      aboutYou: this.formBuilder.group({
        followersCount: ['', [Validators.required]],
        reach: ['', [Validators.required]],
        engagementRate: ['', [Validators.required]],
        niche: ['', [Validators.required]],
      }),
      vision: this.formBuilder.group({
        merchInterest: ['', [Validators.required]],
        collaborationGoals: ['', [Validators.required]],
      }),
      feedback: this.formBuilder.group({
        hearAboutUs: ['', [Validators.required]],
        suggestions: ['', [Validators.required]],
      }),
    });
  }
  next() {
    this.imgArr = this.imgArr.concat(this.imgArr[this.count].trim());
    this.count++;
    const prevButton = this.el.nativeElement.querySelector('.left');
    prevButton.style.display = 'block';
    setTimeout(() => {
      this.pause = true;
    }, 30000);
    this.pause = false;
    this.changeDetection.detectChanges();
    this.slide(this.count);
  }
  prev() {
    this.count--;
    if (this.count === 0) {
      const prevButton = this.el.nativeElement.querySelector('.left');
      prevButton.style.display = 'none';
    }
    this.slide(this.count);
    this.imgArr.pop();
    this.pause = false;
    setTimeout(() => {
      this.pause = true;
    }, 30000);
  }

  ngAfterViewInit(): void {
    const prevButton = this.el.nativeElement.querySelector('.left');
    prevButton.style.display = 'none';

    this.interval = setInterval(() => {
      if (this.count !== 0) {
        prevButton.style.display = 'block';
      }
      if (this.pause) {
        const prevButton = this.el.nativeElement.querySelector('.left');
        prevButton.style.display = 'block';
        this.imgArr = this.imgArr.concat(this.imgArr[this.count].trim());
        this.changeDetection.detectChanges();
        this.count++;
        this.slide(this.count);
      }
    }, 7000);
    // const parallaxElement = this.el.nativeElement.querySelector('.parallaxsection');
    // const threshold = 1
    // this.observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //       }
    //     });
    //   },
    //   { threshold }
    // );
    // this.observer.observe(parallaxElement)
  }

  goBack() {
    if (window.innerWidth <= 425) {
      const allDiv =
        this.el.nativeElement.querySelectorAll('.formSlides > div');
      this.formCount--;
      allDiv[this.formCount].classList.remove('NextForm');
    } else {
      const multiForm = this.el.nativeElement.querySelector('.formSlides');
      this.nextSlide = this.nextSlide + this.width;
      multiForm.style.transform = `translateX(${this.nextSlide}svh)`;
    }
  }
  slide(i: number) {
    const container = this.el.nativeElement.querySelector('.slide');
    container.style.left = `-${i * 100}svw`;
  }

  isFormValid(): boolean {
    return this.multipleForms.controls[this.getFormName()].valid;
  }

  getFormName(): string {
    return Object.keys(this.multipleForms.controls)[this.currentFormIndex];
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab' || event.key === 'Enter') {
      event.preventDefault();
    }
  }

  @HostListener('window:resize', ['$event'])
  changeValue(event: Event) {
    switch (true) {
      case window.innerWidth <= 376:
        this.width = 51.3;
        this.imgArr = this.mobileimgArr;
        break;
      case window.innerWidth <= 425:
        this.imgArr = this.mobileimgArr;
        this.width = 54.5;
        break;
      default:
        this.width = 172;
        const multiForm = this.el.nativeElement.querySelector('.formSlides');
        multiForm.style.transform = `translateX(0svh)`;
        this.nextSlide = 0;
        this.imgArr = this.DesktopimgArr;
        break;
    }
  }

  async nextForm(event: Event, next?: string) {
    event.preventDefault();
    const multiForm = this.el.nativeElement.querySelector('.formSlides');
    if (window.innerWidth <= 425) {
      const allDiv =
        this.el.nativeElement.querySelectorAll('.formSlides > div');
      allDiv[this.formCount].classList.add('NextForm');
      this.formCount++;
    } else {
      this.nextSlide = this.nextSlide - this.width;
      multiForm.style.transform = `translateX(${this.nextSlide}svh)`;
    }
    if (next) {
      if (window.innerWidth <= 425) {
        const lastSlide = this.el.nativeElement.querySelector('.lastSlide');
        lastSlide.style.marginLeft = `-150px`;
      }
      this.sendMail(JSON.stringify(this.multipleForms.value));
    }
  }

  isInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
