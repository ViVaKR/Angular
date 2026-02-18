import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from "@angular/router";
import { MatSliderModule } from '@angular/material/slider';
import { TabIndent } from "@app/core/directives/tab-indent";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export const MATERIAL_COMMON = [
  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatCardModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatRippleModule,
  MatButtonToggleModule,
  FormsModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatSelectModule,
  MatDialogModule,
  MatGridListModule,
  MatTreeModule,
  MatTabsModule,
  MatTimepickerModule,
  MatStepperModule,
  MatSliderModule,
  RouterLink,
  TabIndent,
  ClipboardModule,
  MatSlideToggleModule

] as const;
