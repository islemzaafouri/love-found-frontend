import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/AuthService';
import { Router } from '@angular/router';
import {  EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  @Output()
  registerClicked = new EventEmitter<void>();

  goToRegister(): void {
  this.registerClicked.emit();
  }

  
  private cdr = inject(ChangeDetectorRef);
  private fb=inject(FormBuilder); 
  
  private authService=inject(AuthService);

  private router=inject(Router);

  loginForm=this.fb.nonNullable.group({
    email:['',[Validators.required,Validators.email],],
    password:['',[Validators.required,Validators.minLength(8)]]
  });

  errorMessage='';

    ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
    email: [''],
    password: ['']
  });
}

  onSubmit(){

    //1.validate the form

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    //2.remove previous error message
    this.errorMessage='';

    //3.send the login request to the server
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next:(response)=>{
        //4.redirect to depending on the role of the user
        if(response.role==='ADOPTER'){
          this.router.navigate(['/pets']);
        }else if(response.role==='SHELTER'){
          this.router.navigate(['/dashboard']);
        }
        else if(response.role==='ADMIN'){
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {

          console.error('login failed', error);

          this.errorMessage =
            error.error?.message ||
            'login failed , check your email and password and  Please try again.';
            this.cdr.detectChanges();   
        }
    });


  }
}
