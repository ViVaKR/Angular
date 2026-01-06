import { ReactiveFormsModule } from "@angular/forms";
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
import { CdkTableModule } from "@angular/cdk/table";

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
  MatTooltipModule,
  MatCardModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  CdkTableModule
  // 자주 쓰는 것 25개 정도만


] as const;
// 자주 쓰는 기본 세트
export const MATERIAL_BASIC = [
  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
] as const;

// 폼 관련
export const MATERIAL_FORMS = [
  ...MATERIAL_BASIC,
  MatNativeDateModule,
] as const;

// 데이터 표시 관련
export const MATERIAL_DATA = [
  MatCardModule,
  MatListModule,
] as const;

// 레이아웃 관련
export const MATERIAL_LAYOUT = [
  MatDividerModule,
  MatExpansionModule,
] as const;

// 오버레이 관련
export const MATERIAL_OVERLAY = [
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatBottomSheetModule
] as const;

// 진짜 귀찮으면 전체!
export const MATERIAL_ALL = [
  ...MATERIAL_BASIC,
  ...MATERIAL_FORMS,
  ...MATERIAL_DATA,
  ...MATERIAL_LAYOUT,
  ...MATERIAL_OVERLAY,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatButtonToggleModule,
] as const;
