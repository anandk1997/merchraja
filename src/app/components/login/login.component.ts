import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  goToPage() {
    const lastPage = localStorage.getItem('lastPage');
    const location = AES.decrypt(lastPage!, 'key').toString(enc.Utf8);
    this.router.navigateByUrl(location);
  }

  goToLogin() {
    const loginForm = this.el.nativeElement.querySelector('.login');
    const Left = this.el.nativeElement.querySelector('.Left');
    const buttonContainers =
      this.el.nativeElement.querySelector('.buttonContainers');
    const signupForm = this.el.nativeElement.querySelector('.signUp');

    // Create the span elements for "Welcome to" and "MerchRaja!!"
    const span1 = this.renderer.createElement('span');
    const span2 = this.renderer.createElement('span');

    // Set the text content of the spans
    span1.innerText = 'Welcome to';
    span2.innerText = 'MerchRaja!!';

    // Create a div for the text container
    const textContainer = this.renderer.createElement('div');
    textContainer.classList.add('welCome');
    // Append the spans to the text container
    textContainer.appendChild(span1);
    textContainer.appendChild(span2);

    // Insert the text container before the first .line element
    const lines = Left.querySelectorAll('.line');
    Left.insertBefore(textContainer, lines[1]);

    // Hide login form and button containers, display signup form
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    buttonContainers.style.display = 'none';
  }
}
