import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { Component, OnInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  public orderConfirmation = [
    {
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
    {
      title: 'Half Cut Sleeve T-shirt',
      Influncer: 'by Influncer name',
      price: ' ₹700',
      originalPrrize: '₹1400',
      off: '50% Off',
    },
  ];
  constructor(private el: ElementRef) {}

  ngOnInit() {}
}
