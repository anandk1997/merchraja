import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
@Component({
  selector: 'app-my-order-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './my-order-page.component.html',
  styleUrl: './my-order-page.component.scss',
})
export class MyOrderPageComponent implements OnInit {
  public currentPage = 1;
  public itemsPerPage = 3;
  public orderStatus = [
    {
      status: 'Delivered',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
      ratting: '../../../assets/4-Star.svg',
      review: 'Write Review',
    },
    {
      status: 'Cancelled',
      imageUrl: '../../../assets/Ellipse 185.svg',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
    },
    {
      status: 'Shipped',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
    },
    {
      status: 'Out For Delivery',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
    },

    {
      status: 'Awaiting Confirmation',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'Expected delivery on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
    },
    {
      status: 'Order Confirmed',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
    },
    {
      status: 'Order Confirmed',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
    },
    {
      status: 'Out For Delivery',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
      Exchange: 'Exchange/ Return window open till on Sun, 27 Feb 2024',
    },
    {
      status: 'Return Requested',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
    },
    {
      status: 'Picked Up',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
    },
    {
      status: 'Replaced',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
    },
    {
      status: 'Refunded',
      imageUrl: '../../../assets/Ellipse 185.svg',
      date: 'deliver on On Sun, 20 Feb 2024',
      dressImage: '../../../assets/shirt.svg',
      dressDetails: 'Half Sleeve T-shirt Product Name And Detail',
      influencerName: 'BY Influencer Name',
      size: 'Size: XL',
    },
  ];
  ngOnInit() {}
  get paginatedOrderStatus() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.orderStatus.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number[] {
    const pages = [];
    for (
      let i = 1;
      i <= Math.ceil(this.orderStatus.length / this.itemsPerPage);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
