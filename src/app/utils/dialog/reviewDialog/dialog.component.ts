import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  public imputForm!: FormGroup;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private renderer: Renderer2,
  ) {}

  nextInput(elements: string) {
    const parentElement = this.el.nativeElement.querySelector(
      `.${elements.split(',')[0]}`,
    );
    const nextElement = this.el.nativeElement.querySelector(
      `.${elements.split(',')[1]}`,
    );
    parentElement.setAttribute();
    setTimeout(() => {
      parentElement.style.display = 'none';
      nextElement.style.display = 'flex';
    }, 300);
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

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.imputForm = this.fb.group({
      text: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });
    const parentElement = this.el.nativeElement.querySelector(`.dialog`);
    parentElement.style.display = 'flex';
  }

  addRating(i: number, className: string, parent?: string) {
    let parentElement: any;
    let nextElement: any;
    if (parent) {
      parentElement = this.el.nativeElement.querySelector(
        `.${parent.split(',')[0]}`,
      );
      nextElement = this.el.nativeElement.querySelector(
        `.${parent.split(',')[1]}`,
      );
    }

    const ratingElements = this.el.nativeElement.querySelectorAll(
      `.${className}`,
    );
    const newImg = '../../../assets/goldStar.svg';
    const deselectedImg = '../../../assets/hollowstar.svg';
    const clickedImgSrc = ratingElements[i].getAttribute('src');
    const isClickedSelected = clickedImgSrc === newImg;
    for (let index = 0; index < ratingElements.length; index++) {
      if (index <= i) {
        if (parentElement) {
          parentElement.setAttribute('check', 1);
          setTimeout(() => {
            parentElement.style.display = 'none';
            nextElement.style.display = 'flex';
          }, 300);
        }
        ratingElements[index].setAttribute('src', newImg);
      } else if (isClickedSelected) {
        ratingElements[index].setAttribute('src', deselectedImg);
      }
    }
  }
}
