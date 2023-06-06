import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginI } from '../../modelos/login.interface';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  messages: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const message = "Success! You're logged in.";
    this.showMessage(message);

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }

  showMessage(message: string) {
    this.messages = message;
  }
}
