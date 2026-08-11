import { Component } from '@angular/core';
import { LoginComponent } from '../login/login';
import { Register } from '../register/register';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent,Register],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  isRegisterMode=false;

  showRegister():void{
    this.isRegisterMode=true;
  }

  showLogin():void{
    this.isRegisterMode=false;
  }

}
