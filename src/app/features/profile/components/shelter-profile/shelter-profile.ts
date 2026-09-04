import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ShelterProfileResponse } from '../../models/shelter-profile-response';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile-service';
import { ShelterProfileRequest } from '../../models/shelter-profile-request';
import { ReactiveFormsModule } from '@angular/forms'; // 1. Import ReactiveFormsModule

@Component({
  selector: 'app-shelter-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './shelter-profile.html',
  styleUrl: './shelter-profile.scss',
})
export class ShelterProfile implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly fb=inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  //PROFILE
   profile?:ShelterProfileResponse;

   isLoading=true;
   isSaving=false;

   errorMessage='';
   successMessage='';

   isEditing=false;
   
   //FORM
   shelterForm = this.fb.nonNullable.group({
    shelterName: ['',Validators.required],
    phoneNumber: ['',Validators.required],
    address: ['',Validators.required],
    city: ['',Validators.required],
    description: ['',Validators.required]
   })

   //LOAD PROFILE
  ngOnInit(): void {

    this.loadProfile();

  }
  loadProfile():void{
    console.log('loading shelter profile');
    this.profileService.getMyShelterProfile().subscribe({
      next: (profile) => {
        console.log('Shelter profile loaded:',profile);

        this.profile = profile;

        this.shelterForm.patchValue(profile);

        this.isLoading = false;
        this.cdr.markForCheck();

    },
    error: (error) => {
        console.error(
          'Failed to load shelter profile:',
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

    console.log('Editing shelter profile.');

    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = true;
    this.cdr.markForCheck();

  }

  //CANCEL EDIT
  cancelEditing(): void {

    console.log('Cancelling shelter profile edit.');

    if (this.profile) {
      this.shelterForm.patchValue(this.profile);
    }
    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = false;
    this.cdr.markForCheck();
  }

  //SAVE
    saveProfile(): void {
  
      console.log('Saving shelter profile...');
  
      if (this.shelterForm.invalid) {
  
        console.warn('Profile form is invalid.');
  
        this.shelterForm.markAllAsTouched();
  
        return;
      }
      
      const request: ShelterProfileRequest =this.shelterForm.getRawValue();

      console.log('Sending shelter profile update:',request);
  
      console.log('Sending profile update:',request);
  
      this.isSaving = true;
      this.cdr.markForCheck();
  
      this.errorMessage = '';
      this.successMessage = '';
  
      this.profileService.updateMyShelterProfile(request).subscribe({
  
        next: (updatedProfile) => {
  
          console.log(
            'Profile updated:',
            updatedProfile
          );
  
          this.profile = updatedProfile;
          this.shelterForm.patchValue(updatedProfile);
  
          this.isSaving = false;
  
          this.isEditing = false;
          
  
          this.successMessage =
            'Your profile has been updated successfully ';
            this.cdr.markForCheck();
            
        },
  
        error: (error) => {
  
          console.error(
            'Failed to update shelter profile:',
            error
          );
  
          this.errorMessage =
            error?.error?.message ||
            'Could not update your profile.';
  
          this.isSaving = false;
          this.cdr.markForCheck();
        }
  
      });


}}
