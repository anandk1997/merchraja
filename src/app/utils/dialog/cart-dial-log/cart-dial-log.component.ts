import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-dial-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './cart-dial-log.component.html',
  styleUrl: './cart-dial-log.component.scss',
})
export class CartDialLogComponent implements OnInit {
  public imputForm!: FormGroup;
  public CartBill = [
    {
      type: 'Subtotal:',
      price: '₹700',
      describe: 'GST:',
      addGst: '₹50',
      getShipping: 'Shipping:',
      ShippingCharge: '₹50',
      total: 'Total:',
      totalPrice: '₹800',
    },
  ];
  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CartDialLogComponent>,
    private renderer: Renderer2,
    private route: Router,
  ) {}

  nextInput(elements: string) {
    const parentElement = this.el.nativeElement.querySelector(
      `.${elements.split(',')[0]}`,
    );
    const nextElement = this.el.nativeElement.querySelector(
      `.${elements.split(',')[1]}`,
    );
    parentElement.setAttribute('check', 1);
    setTimeout(() => {
      parentElement.style.display = 'none';
      nextElement.style.display = 'flex';
    }, 300);
  }
  capitalizeFirstLetter(control: FormControl) {
    const value = control.value;
    if (value.length > 0) {
      control.setValue(value.charAt(0).toUpperCase() + value.slice(1));
    }
  }
  submitForm() {
    if (this.AddressForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is not valid. Please check the fields.');
    }
  }
  openFileExplorer(currentElement: string) {
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', 'file');
    this.renderer.setStyle(input, 'display', 'none');
    this.renderer.listen(input, 'change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      this.nextInput(currentElement);
    });
    this.renderer.appendChild(document.body, input);
    input.click();
  }
  openOrderConfirmationPage() {
    this.close();
    this.route.navigate(['order-confirmation']);
  }
  close() {
    this.dialogRef.close();
  }
  AddressForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200),
      Validators.pattern(/^[a-zA-Z0-9\s\-]*$/),
    ]),
    street: new FormControl('', [
      Validators.minLength(0),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    pinecode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),

    city: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9][0-9]{9}$/),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(0),
      Validators.maxLength(50),
    ]),
    agreeTerms: new FormControl('', [Validators.requiredTrue]),
  });
  ngOnInit(): void {
    const firstNameControl = this.AddressForm.get('firstName') as FormControl;
    const lastNameControl = this.AddressForm.get('lastName') as FormControl;
    const cityNameControl = this.AddressForm.get('city') as FormControl;
    if (firstNameControl && lastNameControl && cityNameControl) {
      firstNameControl.valueChanges.subscribe((value) => {
        this.capitalizeFirstLetter(firstNameControl);
      });

      lastNameControl.valueChanges.subscribe((value) => {
        this.capitalizeFirstLetter(lastNameControl);
      });
      cityNameControl.valueChanges.subscribe((value) => {
        this.capitalizeFirstLetter(cityNameControl);
      });
    }
    this.imputForm = this.fb.group({
      text: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });
    const parentElement = this.el.nativeElement.querySelector(`.popup`);
    parentElement.style.display = 'flex';
  }
}
