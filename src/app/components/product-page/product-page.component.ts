import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { BreadcrumbesComponent } from '../../utils/templates/breadcrumbes/breadcrumbes.component';
import { colour } from '../../utils/types/types';
import { CarousalComponent } from '../../utils/templates/carousal/carousal.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpsService } from '../../service/http/https.service';
import { lastValueFrom } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../utils/dialog/reviewDialog/dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    MatGridListModule,
    NavbarComponent,
    BreadcrumbesComponent,
    CarousalComponent,
    HttpClientModule,
    FormsModule,
    KeyFilterModule,
    InputNumberModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  providers: [HttpsService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements AfterViewInit {
  public productDetails: any = {
    'Material Composition': 'Pure Cotton',
    Pattern: 'Printed',
    Length: 'Standard Length',
    'Material Type': 'Cotton Blend',
    'Sleeve Type': 'Half Sleeve',
    'Number of items': 1,
    'Country of Origin': 'India',
  };
  public productkeys: Array<string> = Object.keys(this.productDetails);
  public colors: Array<colour> = [
    {
      colour: 'red',
    },
    {
      colour: 'green',
    },
    {
      colour: 'blue',
    },
    {
      colour: 'black',
    },
    {
      colour: 'purple',
    },
  ];
  public productOptions = [
    '#FF8B8B',
    '#F7FF6D',
    '#5BFF89',
    '#A8B1FF',
    '#F7FF6D',
  ];
  public sizes = [
    { size: 'S', range: '32-34', value1: '27', value2: '16.5' },
    { size: 'M', range: '36-38', value1: '27', value2: '17.0' },
    { size: 'L', range: '40-42', value1: '28', value2: '17.5' },
    { size: 'X', range: '44-46', value1: '28', value2: '18' },
    { size: '2X', range: '48-50', value1: '30', value2: '19.0' },
    { size: 'S', range: '52-54', value1: '30', value2: '19.5' },
    { size: '4X', range: '52-54', value1: '31', value2: '20' },
  ];

  public ratingBarData: Array<any> = [
    {
      percentage: '50%',
      stars: '5 Star',
    },
    {
      percentage: '20%',
      stars: '4 Star',
    },
    {
      percentage: '10%',
      stars: '3 Star',
    },
    {
      percentage: '14%',
      stars: '2 Star',
    },
    {
      percentage: '6%',
      stars: '1 Star',
    },
  ];

  public isChartOpen: boolean = false;
  public pincode!: FormGroup;
  public inputCheck: boolean = false;
  public imageArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private el: ElementRef,
    private httpService: HttpsService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogService: MatDialog,
    private route: Router,
  ) {}
  ngAfterViewInit(): void {
    this.pincode = this.fb.group({
      pincode: ['', [Validators.required]],
    });
    const imageBox = this.el.nativeElement.querySelector(
      '.reviewImageBox #after',
    );
    imageBox.setAttribute('itemLeft', `+${this.imageArray.length - 4}`);
    console.log(imageBox);
  }

  async getPincodeData() {
    const inputValue = this.pincode.controls['pincode'].value;
    const regex = new RegExp('^[0-9]*$');
    const match = regex.test(inputValue);
    const inputElement = this.el.nativeElement.querySelector('.input');
    if (inputValue.length === 6 && match) {
      const data = await lastValueFrom(
        this.httpService.checkPinCode(inputValue),
      );
      if (data[0].Status === 'Error') {
        this._snackBar.open(data[0].Message, 'Close', {
          duration: 2000,
          politeness: 'polite',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return;
      }
      this.inputCheck = true;
      const text = data[0].PostOffice[0].Circle + ' - ' + inputValue;
      inputElement.style.width = '130px';
      this.pincode.patchValue({
        pincode: text,
      });
      return;
    } else if (inputValue.length > 0 && !match) {
      inputElement.style.width = '115px';
      this.pincode.patchValue({
        pincode: '',
      });
      this._snackBar.open('Invalid Input', 'Close', {
        duration: 2000,
        politeness: 'polite',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  openDialogbox() {
    this.dialogService.open(DialogComponent, {
      height: '28vw',
      width: '43vw',
      closeOnNavigation: true,
      hasBackdrop: true,
      panelClass: 'modalPopup',
      enterAnimationDuration: '150ms',
    });
  }

  goToCartPage() {
    this.route.navigate(['cart']);
  }

  addRating(i: number, className: string) {
    const ratingElements = this.el.nativeElement.querySelectorAll(
      `.${className}`,
    );
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
}
