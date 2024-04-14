import { Component, ElementRef, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { BreadcrumbesComponent } from '../../utils/templates/breadcrumbes/breadcrumbes.component';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    MatGridListModule,
    NavbarComponent,
    BreadcrumbesComponent,
    CommonModule,
    SliderModule,
    SelectButtonModule,
    FormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryPageComponent implements OnInit {
  public CategoryItem = [
    {
      imageUrl: '../../../assets/shirt.svg',
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      imageUrl: '../../../assets/shirt.svg',
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      imageUrl: '../../../assets/shirt.svg',
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      imageUrl: '../../../assets/shirt.svg',
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
  ];

  rangeValues: number[] = [20, 80];

  getBackgroundColor(index: number): string {
    const colors = ['#ffa0a0', '#F7FF6D', '#5BFF89', '#A8B1FF'];
    return colors[index % colors.length];
  }
  public categories = [
    'Fashion',
    'Beauty',
    'Travel',
    'Fitness',
    'Gaming',
    'Comedy',
    'Music',
    'Lifestyle',
    'Education',
    'Business',
  ];

  constructor(
    private el: ElementRef,
    private route: Router,
  ) {}

  ngOnInit() {}

  addRating(i: number) {
    const ratingElements = this.el.nativeElement.querySelectorAll('.ratingImg');
    const newImg = '../../../assets/goldStar.svg';
    const deselectedImg = '../../../assets/star.svg';
    const clickedImgSrc = ratingElements[i].getAttribute('src');
    const isClickedSelected = clickedImgSrc === newImg;
    for (let index = 0; index < ratingElements.length; index++) {
      if (index <= i) {
        ratingElements[index].setAttribute('src', newImg);
      } else if (isClickedSelected) {
        ratingElements[index].setAttribute('src', deselectedImg);
      }
    }
  }

  addWishList(index?: number) {
    const element = index
      ? this.el.nativeElement.querySelectorAll('.wishlistcard')
      : this.el.nativeElement.querySelector('.wishlist');
    console.log(index, element);
    const isRed = index
      ? element[index - 1].getAttribute('fill') === 'red'
      : element.getAttribute('fill') === 'red';
    if (!isRed)
      index
        ? element[index - 1].setAttribute('fill', 'red')
        : element.setAttribute('fill', 'red');
    else
      index
        ? element[index - 1].setAttribute('fill', 'none')
        : element.setAttribute('fill', 'none');
  }

  goToCategoryPage() {
    this.route.navigate(['category/product']);
  }
}
