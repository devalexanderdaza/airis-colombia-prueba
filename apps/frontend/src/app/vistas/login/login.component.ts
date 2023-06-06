import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../modelos/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  messages: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.api.loginByEmail(this.loginForm.value as LoginI).subscribe((data: any) => {
      if (data.status == 200) {
        localStorage.setItem('token', `Bearer ${data.data}`);
        const message = data.message;
        this.showMessage(message);

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);
      }
    });
  }

  showMessage(message: string) {
    this.messages = message;
  }
}
