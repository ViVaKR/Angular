import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { IFontOption } from '@app/core/interfaces/i-font-option';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { createFont } from '../utilities/font-factory';

@Component({
  selector: 'app-font-selector',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './font-selector.html',
  styleUrl: './font-selector.scss',
})
export class FontSelector {
  selectedFont = input<string>('font-ibm');
  fontChanged = output<string>();

  fonts: IFontOption[] = [
    createFont('roboto', 'Roboto'),
    createFont('roboto-con', 'Roboto Condensed'),
    createFont('inter', 'Inter'),
    createFont('indie', 'Indie Flower'),
    createFont('fira', 'Fira Code'),
    createFont('cute', 'Cute Font'),
    createFont('ibm', 'IBM Plex Sans'),
    createFont('noto', 'Noto Sans KR'),
    createFont('poppins', 'Poppins'),
    createFont('dongle', 'Dongle'),
    createFont('pen', 'Nanum Pen'),
    createFont('brush', 'Nanum Brush'),
    createFont('flower', 'Sunflower'),
    createFont('a1', 'Gothic A1'),
    createFont('diphy', 'Diphylleia'),
    createFont('stylish', 'Stylish'),
    createFont('hanmun', 'Chiron Sung HK (한문)'),
    createFont('hanmun2', 'Chiron GoRound TC (한문)')
  ];

  selectedFontClass = computed(() => {
    const font = this.fonts.find(f => f.value === this.selectedFont());
    return font?.className ?? '';
  });

  // ✨ 선택된 폰트의 라벨 가져오기
  getSelectedFontLabel(): string {
    const font = this.fonts.find(f => f.value === this.selectedFont());
    return font?.label ?? '';
  }

  onFontChange(value: string) {
    this.fontChanged.emit(value);
  }
}
