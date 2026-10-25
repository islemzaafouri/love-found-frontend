import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../../../core/services/AuthService';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  @Output()
  loginClicked = new EventEmitter<void>();

  selectedRole: 'ADOPTER' | 'SHELTER' = 'ADOPTER';

  errorMessage = '';
  successMessage='';
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
  // Clear old session (Cute Paws Shelter) as soon as registration page loads
  localStorage.clear(); 
  this.authService.currentUser.set(null);
}


  // =========================
  // ADOPTER FORM
  // =========================

  adopterForm = this.fb.nonNullable.group({

    firstName: [
      '',
      [
        Validators.required
      ]
    ],

    lastName: [
      '',
      [
        Validators.required
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    phoneNumber:[
      '',
      [
        Validators.required
      ]
    ],
    city:[
      '',
      [
        Validators.required
      ]
    ]

  });


  // =========================
  // SHELTER FORM
  // =========================

  shelterForm = this.fb.nonNullable.group({

    shelterName: [
      '',
      [
        Validators.required
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],

    phoneNumber: [
      '',
      [
        Validators.required
      ]
    ],

    address: [
      '',
      [
        Validators.required
      ]
    ],

    city: [
      '',
      [
        Validators.required
      ]
    ],

    description: [
      '',
      [
        Validators.required
      ]
    ]

  });


  // =========================
  // CHANGE ROLE
  // =========================

  selectRole(role: 'ADOPTER' | 'SHELTER'): void {

    this.selectedRole = role;

    // Clear any previous error
    this.errorMessage = '';
  }


  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {
    console.log('selectedRole at submit:', this.selectedRole);
    this.errorMessage = '';


    // =========================
    // ADOPTER
    // =========================

    if (this.selectedRole === 'ADOPTER') {

      if (this.adopterForm.invalid) {

        this.adopterForm.markAllAsTouched();

        return;
      }

      const request = this.adopterForm.getRawValue();

      this.authService.registerAdopter(request).subscribe({

        next: (response) => {

          console.log('Adopter registration successful', response);

          this.successMessage = 'Registered successfully! You can now log in.';

          this.cdr.detectChanges();        },

        error: (error) => {

          console.error('Adopter registration failed', error);

          this.errorMessage =
            error.error?.message ||
            'Registration failed. Please try again.';
            this.cdr.detectChanges();

        }

      });

      return;
    }


    // =========================
    // SHELTER
    // =========================

    if (this.shelterForm.invalid) {

      this.shelterForm.markAllAsTouched();

      return;
    }

    const request = this.shelterForm.getRawValue();

    this.authService.registerShelter(request).subscribe({

      next: (response) => {

        console.log('Shelter registration successful', response);
        this.successMessage = 'Registered successfully! You can now log in.';

      },

      error: (error) => {

        console.error('Shelter registration failed', error);

        this.errorMessage =
          error.error?.message ||
          'Registration failed. Please try again.';
          this.cdr.detectChanges();

      }

    });

  }


  // =========================
  // GO TO LOGIN
  // =========================

  goToLogin(): void {

    this.loginClicked.emit();

  }
}