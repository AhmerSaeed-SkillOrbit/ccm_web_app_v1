// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { CdkTableModule } from '@angular/cdk/table';

import {
  MatIconModule, MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatCardModule,
  MatFormFieldModule, MatDialogModule, MatProgressSpinnerModule,
  MatInputModule, MatSortModule, MatTabsModule, MatButtonToggleModule,
  MatChipsModule, MatRadioModule, MatOptionModule, MatSelectModule,
  MatTooltipModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatExpansionModule, MatProgressBarModule,
  MatMenuModule,
  // MatTableModule, 
  MatPaginatorModule, MatStepper, MatNativeDateModule, MatSliderModule,
  MatSlideToggleModule,
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';

// import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CdkTableModule,
    // BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule, MatButtonToggleModule,
    MatChipsModule, MatTabsModule, MatRadioModule,
    MatDialogModule, MatInputModule,
    MatTooltipModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule,
    MatSliderModule, MatSlideToggleModule,
  ],

  exports: [
    CdkTableModule,
    // BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule, MatSortModule,
    MatButtonModule, MatTabsModule,
    MatButtonToggleModule, MatChipsModule,
    MatCheckboxModule, MatRadioModule,
    MatFormFieldModule, MatDialogModule,
    MatInputModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule, MatStepperModule,
    MatDatepickerModule, MatGridListModule, MatNativeDateModule,
    MatSliderModule, MatSlideToggleModule,
  ]
})
export class MaterialModule { }
