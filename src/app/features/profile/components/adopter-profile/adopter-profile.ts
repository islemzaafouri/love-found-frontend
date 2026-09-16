import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { FormBuilder, Validators } from '@angular/forms';
import { AdopterProfileResponse } from '../../models/adopter-profile-response';
import { ExperienceLevel, HomeType, LifeStyleActivity, PreferredSpecies, WorkSchedule } from '../../enums/profile-enums';
import { AdopterProfileRequest } from '../../models/adopte-profile-request';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adopter-profile',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './adopter-profile.html',
  styleUrl: './adopter-profile.scss',
})
export class AdopterProfile implements OnInit {
  
  private readonly profileService = inject(ProfileService);
  private readonly fb=inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  //PROFILE
   profile?:AdopterProfileResponse;

   isLoading=true;
   isSaving=false;

   errorMessage='';
   successMessage='';

   isEditing=false;

   //ENUM OPTIONS
   lifestyleActivities: LifeStyleActivity[] = [
    'ACTIVE',
    'MODERATE',
    'SEDENTARY'
  ];

  experienceLevels: ExperienceLevel[] = [
    'FIRST_TIME',
    'INTERMEDIATE',
    'EXPERIENCED'
  ];

  homeTypes: HomeType[] = [
    'APARTMENT',
    'HOUSE_NO_YARD',
    'HOUSE_WITH_YARD'
  ];

  workSchedules: WorkSchedule[] = [
    'FULL_TIME',
    'PART_TIME',
    'REMOTE',
    'FLEXIBLE'
  ];
  preferredSpecies: PreferredSpecies[] = [
    'DOG',
    'CAT',
    'RABBIT',
    'OTHER',
    'ANY'
  ];

  //FORM
  adopterForm = this.fb.nonNullable.group({
    firstName: [
      '',
      [Validators.required]
    ],

    lastName: [
      '',
      [Validators.required]
    ],

    phoneNumber: [
      '',
      [Validators.required]
    ],

    city: [
      '',
      [Validators.required]
    ],
    lifestyleActivity: [
      'MODERATE' as LifeStyleActivity,
      [Validators.required]
    ],

    experience: [
      'FIRST_TIME' as ExperienceLevel,
      [Validators.required]
    ],

    homeType: [
      'APARTMENT' as HomeType,
      [Validators.required]
    ],

    hasOtherPets: [
      false,
      
    ],
    hasChildren: [
      false,
      
    ],

    workSchedule: [
      'FULL_TIME' as WorkSchedule,
      [Validators.required]
    ],

    preferredSpecies: [
      'ANY' as PreferredSpecies,
      [Validators.required]
    ],
    hasAllergies: [
      false,
    
    ]
  })

  //LOAD PROFILE
  ngOnInit(): void {

    this.loadProfile();

  }
  loadProfile():void{
    console.log('loading adopter profile');
    this.profileService.getMyAdopterProfile().subscribe({
      next: (profile) => {
        console.log('Adopter profile loaded:',profile);

        this.profile = profile;

        this.adopterForm.patchValue(profile);

        this.isLoading = false;
        this.cdr.markForCheck();

    },
    error: (error) => {
        console.error(
          'Failed to load adopter profile:',
          error
        );
        this.errorMessage =
          error?.error?.message ||
          'Could not load your profile.';

        this.isLoading = false;
        this.cdr.markForCheck();


      }})}

    //EDIT
    startEditing(): void {

    console.log('Editing adopter profile.');

    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = true;
    this.cdr.markForCheck();

  }

  //CANCEL EDIT
  cancelEditing(): void {

    console.log('Cancelling profile edit.');

    if (this.profile) {
      this.adopterForm.patchValue(this.profile);
    }
    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = false;
    this.cdr.markForCheck();
  }
  
  //SAVE
  saveProfile(): void {

    console.log('Saving adopter profile...');

    if (this.adopterForm.invalid) {

      console.warn('Profile form is invalid.');

      this.adopterForm.markAllAsTouched();

      return;
    }
    
    const request: AdopterProfileRequest =
      this.adopterForm.getRawValue();
        console.log(this.adopterForm.getRawValue());

    console.log(
      'Sending profile update:',
      request
    );

    this.isSaving = true;
    this.cdr.markForCheck();

    this.errorMessage = '';
    this.successMessage = '';

    this.profileService.updateMyAdopterProfile(request).subscribe({

      next: (updatedProfile) => {

        console.log(
          'Profile updated:',
          updatedProfile
        );

        this.profile = updatedProfile;
        this.adopterForm.patchValue(updatedProfile);

        this.isSaving = false;

        this.isEditing = false;
        

        this.successMessage =
          'Your profile has been updated successfully ';
          this.cdr.markForCheck();
          
      },

      error: (error) => {

        console.error(
          'Failed to update adopter profile:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Could not update your profile.';

        this.isSaving = false;
        this.cdr.markForCheck();
      }

    });

  }











    
  }










