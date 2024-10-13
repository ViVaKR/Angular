import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { KatexOptions, MarkdownModule } from 'ngx-markdown';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import katex from 'katex';
import { VivEditorComponent } from "../../viv-editor/viv-editor.component";
import renderMathInElement from 'katex/contrib/auto-render';
@Component({
  selector: 'app-katex-latex-camp',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    VivEditorComponent
  ],
  templateUrl: './katex-latex-camp.component.html',
  styleUrl: './katex-latex-camp.component.scss'
})
export class KatexLatexCampComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @Input() title: string = 'Katex (수학식) Camp';

  form = new FormGroup('');

  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);

  menuId: number;
  menuParam: boolean;

  @ViewChild('myCode') myCode: ElementRef;

  readonly clipboardButton = ClipboardButtonComponent;

  public katexOptions: KatexOptions = {
    displayMode: true,
    throwOnError: false,
    errorColor: '#cccc00',
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
      { left: '$', right: '$', display: false }
    ]
  };

  renderedMathExpressions: string[] = [];

  mathA = [
    { desc: '정삼각형의 넓이 공식', symbol: '정삼각형의 넓이 공식', ex: '정삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{\\sqrt{3}}{4} a^2' },
    { desc: '정삼각형의 높이 공식', symbol: '정삼각형의 높이 공식', ex: '정삼각형의 높이 공식', source: 'h = \\frac{\\sqrt{3}}{2} a' },
    { desc: '직각삼각형의 넓이 공식', symbol: '직각삼각형의 넓이 공식', ex: '직각삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{1}{2} ab' },
    { desc: '피타고라스의 정리', symbol: '피타고라스의 정리', ex: '피타고라스의 정리', source: 'a^2 + b^2 = c^2' },
    { desc: '이등변삼각형의 넓이 공식', symbol: '이등변삼각형의 넓이 공식', ex: '이등변삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{1}{2} b h' },
    { desc: '삼각형의 넓이 공식', symbol: '삼각형의 넓이 공식', ex: '삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{1}{2} b h' },
    { desc: '헤론의 공식', symbol: '헤론의 공식', ex: '헤론의 공식', source: '\\text{넓이} = \\sqrt{s(s-a)(s-b)(s-c)}' },
    { desc: '각과 삼각형의 넓이 공식', symbol: '각과 삼각형의 넓이 공식', ex: '각과 삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{1}{2} ab \\sin(C)' },
    { desc: '내접원과 삼각형의 넓이 공식', symbol: '내접원과 삼각형의 넓이 공식', ex: '내접원과 삼각형의 넓이 공식', source: '\\text{넓이} = r s' },
    { desc: '외접원과 삼각형의 넓이 공식', symbol: '외접원과 삼각형의 넓이 공식', ex: '외접원과 삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{abc}{4R}' },
    { desc: '두 벡터가 생성하는 삼각형의 넓이 공식', symbol: '두 벡터가 생성하는 삼각형의 넓이 공식', ex: '두 벡터가 생성하는 삼각형의 넓이 공식', source: '\\text{넓이} = \\frac{1}{2} \\| \\vec{a} \\times \\vec{b} \\|' },
    { desc: '사선 공식', symbol: '사선 공식', ex: '사선 공식', source: '\\text{넓이} = \\frac{1}{2} \\left| x_1 y_2 + x_2 y_3 + x_3 y_1 - y_1 x_2 - y_2 x_3 - y_3 x_1 \\right|' },
    { desc: '무게중심 공식', symbol: '무게중심 공식', ex: '무게중심 공식', source: 'G = \\left( \\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3} \\right)' },
    { desc: '중선 정리', symbol: '중선 정리', ex: '중선 정리', source: 'm_a = \\frac{1}{2} \\sqrt{2b^2 + 2c^2 - a^2}' },
    { desc: '정사각형의 넓이 공식', symbol: '정사각형의 넓이 공식', ex: '정사각형의 넓이 공식', source: 'A = a^2' },
    { desc: '직사각형의 넓이 공식', symbol: '직사각형의 넓이 공식', ex: '직사각형의 넓이 공식', source: 'A = lw' },
    { desc: '직사각형의 둘레 공식', symbol: '직사각형의 둘레 공식', ex: '직사각형의 둘레 공식', source: 'P = 2(l + w)' },
    { desc: '직사각형의 대각선 길이 공식', symbol: '직사각형의 대각선 길이 공식', ex: '직사각형의 대각선 길이 공식', source: 'd = \\sqrt{l^2 + w^2}' },
    { desc: '마름모의 넓이 공식', symbol: '마름모의 넓이 공식', ex: '마름모의 넓이 공식', source: 'A = \\frac{1}{2} d_1 d_2' },
    { desc: '평행사변형의 넓이 공식', symbol: '평행사변형의 넓이 공식', ex: '평행사변형의 넓이 공식', source: 'A = b h' },
    { desc: '사다리꼴의 넓이 공식', symbol: '사다리꼴의 넓이 공식', ex: '사다리꼴의 넓이 공식', source: 'A = \\frac{1}{2} (b_1 + b_2) h' },
    { desc: '사각형의 넓이 공식', symbol: '사각형의 넓이 공식', ex: '사각형의 넓이 공식', source: 'A = lw' },
    { desc: '정오각형의 넓이 공식', symbol: '정오각형의 넓이 공식', ex: '정오각형의 넓이 공식', source: 'A = \\frac{1}{4} \\sqrt{5(5 + 2\\sqrt{5})} a^2' },
    { desc: '정오각형의 높이 공식', symbol: '정오각형의 높이 공식', ex: '정오각형의 높이 공식', source: 'h = \\frac{1}{2} \\sqrt{5 + 2\\sqrt{5}} a' },
    { desc: '정오각형의 대각선 길이 공식', symbol: '정오각형의 대각선 길이 공식', ex: '정오각형의 대각선 길이 공식', source: 'd = \\frac{1 + \\sqrt{5}}{2} a' },
    { desc: '정육각형의 넓이 공식', symbol: '정육각형의 넓이 공식', ex: '정육각형의 넓이 공식', source: 'A = \\frac{3\\sqrt{3}}{2} a^2' },
    { desc: '다각형의 대각선 수 공식', symbol: '다각형의 대각선 수 공식', ex: '다각형의 대각선 수 공식', source: 'D = \\frac{n(n-3)}{2}' },
    { desc: '다각형의 내각의 합 공식', symbol: '다각형의 내각의 합 공식', ex: '다각형의 내각의 합 공식', source: 'S = 180(n-2)' },
    { desc: '정다각형의 넓이 공식', symbol: '정다각형의 넓이 공식', ex: '정다각형의 넓이 공식', source: 'A = \\frac{1}{4} n a^2 \\cot(\\frac{\\pi}{n})' },
    { desc: '정다각형의 내각 공식', symbol: '정다각형의 내각 공식', ex: '정다각형의 내각 공식', source: '\\text{내각} = \\frac{(n-2) \\times 180}{n}' },
    { desc: '원의 넓이 공식', symbol: '원의 넓이 공식', ex: '원의 넓이 공식', source: 'A = \\pi r^2' },
    { desc: '원의 둘레 공식', symbol: '원의 둘레 공식', ex: '원의 둘레 공식', source: 'C = 2\\pi r' },
    { desc: '원의 방정식 공식', symbol: '원의 방정식 공식', ex: '원의 방정식 공식', source: '(x - h)^2 + (y - k)^2 = r^2' },
    { desc: '원주각과 중심각 공식', symbol: '원주각과 중심각 공식', ex: '원주각과 중심각 공식', source: '\\text{원주각} = \\frac{1}{2} \\text{중심각}' },
    { desc: '방멱의 정리', symbol: '방멱의 정리', ex: '방멱의 정리', source: 'PA \\times PB = PC \\times PD' },
    { desc: '접현의 정리', symbol: '접현의 정리', ex: '접현의 정리', source: 'PA^2 = PB \\times PC' },
    { desc: '원주율 공식', symbol: '원주율 공식', ex: '원주율 공식', source: '\\pi = \\frac{C}{d}' },
    { desc: '원주율 구하는 공식', symbol: '원주율 구하는 공식', ex: '원주율 구하는 공식', source: '\\pi = 3.141592...' },
    { desc: '부채꼴의 중심각 공식', symbol: '부채꼴의 중심각 공식', ex: '부채꼴의 중심각 공식', source: '\\theta = \\frac{l}{r}' },
    { desc: '부채꼴의 넓이 공식', symbol: '부채꼴의 넓이 공식', ex: '부채꼴의 넓이 공식', source: 'A = \\frac{1}{2} r^2 \\theta' },
    { desc: '호의 길이 공식', symbol: '호의 길이 공식', ex: '호의 길이 공식', source: 'l = r \\theta' },
    { desc: '타원의 넓이 공식', symbol: '타원의 넓이 공식', ex: '타원의 넓이 공식', source: 'A = \\pi ab' },
    { desc: '타원의 이심률 공식', symbol: '타원의 이심률 공식', ex: '타원의 이심률 공식', source: 'e = \\sqrt{1 - \\frac{b^2}{a^2}}' },
    { desc: '타원의 방정식 공식', symbol: '타원의 방정식 공식', ex: '타원의 방정식 공식', source: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1' },
    { desc: '구의 부피 공식', symbol: '구의 부피 공식', ex: '구의 부피 공식', source: 'V = \\frac{4}{3} \\pi r^3' },
    { desc: '구의 겉넓이 공식', symbol: '구의 겉넓이 공식', ex: '구의 겉넓이 공식', source: 'A = 4\\pi r^2' },
    { desc: '원기둥의 부피 공식', symbol: '원기둥의 부피 공식', ex: '원기둥의 부피 공식', source: 'V = \\pi r^2 h' },
    { desc: '원기둥의 겉넓이 공식', symbol: '원기둥의 겉넓이 공식', ex: '원기둥의 겉넓이 공식', source: 'A = 2\\pi r (r + h)' },
    { desc: '원뿔의 부피 공식', symbol: '원뿔의 부피 공식', ex: '원뿔의 부피 공식', source: 'V = \\frac{1}{3} \\pi r^2 h' },
    { desc: '원뿔의 겉넓이 공식', symbol: '원뿔의 겉넓이 공식', ex: '원뿔의 겉넓이 공식', source: 'A = \\pi r (r + l)' },
    { desc: '삼각뿔의 부피', symbol: '삼각뿔의 부피', ex: '삼각뿔의 부피', source: 'V = \\frac{1}{3} \\times base \\times height' },
    { desc: '정사각뿔의 부피', symbol: '정사각뿔의 부피', ex: '정사각뿔의 부피', source: 'V = \\frac{1}{3} a^2 h' },
    { desc: '정사각뿔의 겉넓이', symbol: '정사각뿔의 겉넓이', ex: '정사각뿔의 겉넓이', source: 'A = a^2 + 2a \\sqrt{\\left(\\frac{a}{2}\\right)^2 + h^2}' },
    { desc: '정사각뿔의 높이', symbol: '정사각뿔의 높이', ex: '정사각뿔의 높이', source: 'h = \\sqrt{\\left(\\frac{a}{2}\\right)^2 + l^2}' },
    { desc: '정사면체의 부피', symbol: '정사면체의 부피', ex: '정사면체의 부피', source: 'V = \\frac{a^3 \\sqrt{2}}{12}' },
    { desc: '정사면체의 겉넓이', symbol: '정사면체의 겉넓이', ex: '정사면체의 겉넓이', source: 'A = \\sqrt{3} a^2' },
    { desc: '정사면체의 높이', symbol: '정사면체의 높이', ex: '정사면체의 높이', source: 'h = \\frac{a \\sqrt{6}}{3}' },
    { desc: '정육면체의 부피', symbol: '정육면체의 부피', ex: '정육면체의 부피', source: 'V = a^3' },
    { desc: '정육면체의 겉넓이', symbol: '정육면체의 겉넓이', ex: '정육면체의 겉넓이', source: 'A = 6a^2' },
    { desc: '직육면체의 부피', symbol: '직육면체의 부피', ex: '직육면체의 부피', source: 'V = l \\times w \\times h' },
    { desc: '직육면체의 겉넓이', symbol: '직육면체의 겉넓이', ex: '직육면체의 겉넓이', source: 'A = 2(lw + lh + wh)' },
    { desc: '직육면체의 대각선 길이', symbol: '직육면체의 대각선 길이', ex: '직육면체의 대각선 길이', source: 'd = \\sqrt{l^2 + w^2 + h^2}' },
    { desc: '오일러 다면체 정리', symbol: '오일러 다면체 정리', ex: '오일러 다면체 정리', source: 'V - E + F = 2' },
    { desc: '근의 공식', symbol: '근의 공식', ex: '근의 공식', source: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { desc: '짝수 근의 공식', symbol: '짝수 근의 공식', ex: '짝수 근의 공식', source: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { desc: '근과 계수와의 관계', symbol: '근과 계수와의 관계', ex: '근과 계수와의 관계', source: 'x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 x_2 = \\frac{c}{a}' },
    { desc: '삼차방정식 근의 공식', symbol: '삼차방정식 근의 공식', ex: '삼차방정식 근의 공식', source: 'ax^3 + bx^2 + cx + d = 0' },
    { desc: '제곱근 근삿값', symbol: '제곱근 근삿값', ex: '제곱근 근삿값', source: '\\sqrt{n} \\approx \\frac{a + \\frac{n}{a}}{2}' },
    { desc: '황금비', symbol: '황금비', ex: '황금비', source: '\\phi = \\frac{1 + \\sqrt{5}}{2}' },
    { desc: '분모의 유리화', symbol: '분모의 유리화', ex: '분모의 유리화', source: '\\frac{a}{\\sqrt{b}} = \\frac{a \\sqrt{b}}{b}' },
    { desc: '이중근호', symbol: '이중근호', ex: '이중근호', source: '\\sqrt{a + \\sqrt{b}}' },
    { desc: '제곱', symbol: '제곱', ex: '제곱', source: '(a + b)^2 = a^2 + 2ab + b^2' },
    { desc: '이차식 곱셈', symbol: '이차식 곱셈', ex: '이차식 곱셈', source: '(a + b)(a - b) = a^2 - b^2' },
    { desc: '합차 공식', symbol: '합차 공식', ex: '합차 공식', source: '(a + b)(a - b) = a^2 - b^2' },
    { desc: '세 수의 합의 제곱', symbol: '세 수의 합의 제곱', ex: '세 수의 합의 제곱', source: '(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca' },
    { desc: '세제곱 곱셈', symbol: '세제곱 곱셈', ex: '세제곱 곱셈', source: '(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3' },
    { desc: '네제곱', symbol: '네제곱', ex: '네제곱', source: '(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4' },
    { desc: '이항 정리', symbol: '이항 정리', ex: '이항 정리', source: '(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k' },
    { desc: '이차다항식 인수분해', symbol: '이차다항식 인수분해', ex: '이차다항식 인수분해', source: 'ax^2 + bx + c = a(x - x_1)(x - x_2)' },
    { desc: '제곱식 인수분해', symbol: '제곱식 인수분해', ex: '제곱식 인수분해', source: 'a^2 - b^2 = (a - b)(a + b)' },
    { desc: '세제곱식 인수분해', symbol: '세제곱식 인수분해', ex: '세제곱식 인수분해', source: 'a^3 - b^3 = (a - b)(a^2 + ab + b^2)' },
    { desc: '등차수열', symbol: '등차수열', ex: '등차수열', source: 'a_n = a_1 + (n-1)d' },
    { desc: '등차수열의 합', symbol: '등차수열의 합', ex: '등차수열의 합', source: 'S_n = \\frac{n}{2} (a_1 + a_n)' },
    { desc: '등비수열', symbol: '등비수열', ex: '등비수열', source: 'a_n = a_1 r^{n-1}' },
    { desc: '등비수열의 합', symbol: '등비수열의 합', ex: '등비수열의 합', source: 'S_n = a_1 \\frac{1-r^n}{1-r}' },
    { desc: '무한등비수열의 합', symbol: '무한등비수열의 합', ex: '무한등비수열의 합', source: 'S = \\frac{a_1}{1-r}' },
    { desc: '수열의 극한', symbol: '수열의 극한', ex: '수열의 극한', source: '\\lim_{n \\to \\infty} a_n' },
    { desc: '수열의 합', symbol: '수열의 합', ex: '수열의 합', source: 'S_n = \\sum_{i=1}^{n} a_i' },
    { desc: '무한급수', symbol: '무한급수', ex: '무한급수', source: '\\sum_{n=1}^{\\infty} a_n' },
    { desc: '계차수열', symbol: '계차수열', ex: '계차수열', source: 'a_{n+1} - a_n = f(n)' },

    { desc: '증가율', symbol: '증가율', ex: '증가율', source: '\\text{증가율} = \\frac{\\text{최종값} - \\text{초기값}}{\\text{초기값}} \\times 100\\%' },
    { desc: '원리합계', symbol: '원리합계', ex: '원리합계', source: 'A = P(1 + rt)' },
    { desc: '기수불, 기말불 원리합계', symbol: '기수불, 기말불 원리합계', ex: '기수불, 기말불 원리합계', source: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}' },
    { desc: '하노이탑', symbol: '하노이탑', ex: '하노이탑', source: 'T(n) = 2^n - 1' },
    { desc: '부분분수', symbol: '부분분수', ex: '부분분수', source: '\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}' },
    { desc: '약수의 개수', symbol: '약수의 개수', ex: '약수의 개수', source: '\\text{약수의 개수} = (e_1 + 1)(e_2 + 1) \\cdots (e_k + 1)' },
    { desc: '직선의 기울기', symbol: '직선의 기울기', ex: '직선의 기울기', source: 'm = \\frac{y_2 - y_1}{x_2 - x_1}' },
    { desc: '직선의 방정식', symbol: '직선의 방정식', ex: '직선의 방정식', source: 'y = mx + b' },
    { desc: '두 점 사이의 거리', symbol: '두 점 사이의 거리', ex: '두 점 사이의 거리', source: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}' },
    { desc: '점과 직선 사이의 거리', symbol: '점과 직선 사이의 거리', ex: '점과 직선 사이의 거리', source: 'd = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}' },
    { desc: '평균변화율', symbol: '평균변화율', ex: '평균변화율', source: '\\frac{f(b) - f(a)}{b - a}' },
    { desc: '접선의 방정식', symbol: '접선의 방정식', ex: '접선의 방정식', source: 'y - y_1 = m(x - x_1)' },
    { desc: '스튜어트의 정리', symbol: '스튜어트의 정리', ex: '스튜어트의 정리', source: 'b^2m + c^2n = a(d^2 + mn)' },
    { desc: '내분점', symbol: '내분점', ex: '내분점', source: '\\left( \\frac{mx_2 + nx_1}{m+n}, \\frac{my_2 + ny_1}{m+n} \\right)' },
    { desc: '외분점', symbol: '외분점', ex: '외분점', source: '\\left( \\frac{mx_2 - nx_1}{m-n}, \\frac{my_2 - ny_1}{m-n} \\right)' },
    { desc: '벡터의 길이', symbol: '벡터의 길이', ex: '벡터의 길이', source: '|\\mathbf{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}' },
    { desc: '벡터 내적', symbol: '벡터 내적', ex: '벡터 내적', source: '\\mathbf{a} \\cdot \\mathbf{b} = a_1b_1 + a_2b_2 + a_3b_3' },
    { desc: '벡터 외적', symbol: '벡터 외적', ex: '벡터 외적', source: '\\mathbf{a} \\times \\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}' },
    { desc: '역행렬', symbol: '역행렬', ex: '역행렬', source: 'A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)' },
    { desc: '쌍곡선의 표준형', symbol: '쌍곡선의 표준형', ex: '쌍곡선의 표준형', source: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1' },
    { desc: '쌍곡선의 이심률', symbol: '쌍곡선의 이심률', ex: '쌍곡선의 이심률', source: 'e = \\sqrt{1 + \\frac{b^2}{a^2}}' },
    { desc: '곡률', symbol: '곡률', ex: '곡률', source: 'K = \\frac{|f\'\'(x)|}{(1 + f\'(x)^2)^{3/2}}' },
    { desc: '집합', symbol: '집합', ex: '집합', source: 'A \\cup B, \\quad A \\cap B' },
    { desc: '드 모르간의 법칙', symbol: '드 모르간의 법칙', ex: '드 모르간의 법칙', source: '\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}, \\quad \\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}' },
    { desc: '집합의 분할', symbol: '집합의 분할', ex: '집합의 분할', source: 'P(n, k) = \\frac{n!}{k!(n-k)!}' },
    { desc: '집합의 분배 법칙', symbol: '집합의 분배 법칙', ex: '집합의 분배 법칙', source: 'A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)' },
    { desc: '순열', symbol: '순열', ex: '순열', source: 'P(n, r) = \\frac{n!}{(n-r)!}' },
    { desc: '조합', symbol: '조합', ex: '조합', source: 'C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}' },
    { desc: '중복조합', symbol: '중복조합', ex: '중복조합', source: 'C(n+r-1, r) = \\binom{n+r-1}{r}' },
    { desc: '퍼센트 구하는 공식', symbol: '퍼센트 구하는 공식', ex: '퍼센트 구하는 공식', source: '\\text{퍼센트} = \\frac{\\text{부분}}{\\text{전체}} \\times 100\\%' },
    { desc: '농도', symbol: '농도', ex: '농도', source: '\\text{농도} = \\frac{\\text{용질의 양}}{\\text{용액의 양}} \\times 100\\%' },
    { desc: '밀도', symbol: '밀도', ex: '밀도', source: '\\text{밀도} = \\frac{\\text{질량}}{\\text{부피}}' },
    { desc: '확률의 곱셈 법칙', symbol: '확률의 곱셈 법칙', ex: '확률의 곱셈 법칙', source: 'P(A \\cap B) = P(A) \\times P(B|A)' },
    { desc: '독립사건', symbol: '독립사건', ex: '독립사건', source: 'P(A \\cap B) = P(A) \\times P(B)' },
    { desc: '조건부 확률', symbol: '조건부 확률', ex: '조건부 확률', source: 'P(B|A) = \\frac{P(A \\cap B)}{P(A)}' },
    { desc: '산술 기하평균', symbol: '산술 기하평균', ex: '산술 기하평균', source: '\\sqrt{ab} \\leq \\frac{a+b}{2}' },
    { desc: '모분산', symbol: '모분산', ex: '모분산', source: '\\sigma^2 = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2' },
    { desc: '공분산', symbol: '공분산', ex: '공분산', source: '\\text{Cov}(X, Y) = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu_X)(y_i - \\mu_Y)' },
    { desc: '표본분산', symbol: '표본분산', ex: '표본분산', source: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2' },
    { desc: '모표준편차', symbol: '모표준편차', ex: '모표준편차', source: '\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}' },
    { desc: '상관계수', symbol: '상관계수', ex: '상관계수', source: 'r = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}' },
    { desc: '표본표준편차', symbol: '표본표준편차', ex: '표본표준편차', source: 's = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}' },
    { desc: '정규분포의 표준화', symbol: '정규분포의 표준화', ex: '정규분포의 표준화', source: 'Z = \\frac{X - \\mu}{\\sigma}' },
    { desc: '표준정규분포 값', symbol: '표준정규분포 값', ex: '표준정규분포 값', source: 'Z = \\frac{X - \\mu}{\\sigma}' },
    { desc: '정규분포의 합', symbol: '정규분포의 합', ex: '정규분포의 합', source: 'X + Y \\sim N(\\mu_X + \\mu_Y, \\sigma_X^2 + \\sigma_Y^2)' },
    { desc: '95% 신뢰구간', symbol: '95% 신뢰구간', ex: '95% 신뢰구간', source: '\\bar{x} \\pm 1.96 \\frac{s}{\\sqrt{n}}' },
    { desc: '99% 신뢰구간', symbol: '99% 신뢰구간', ex: '99% 신뢰구간', source: '\\bar{x} \\pm 2.576 \\frac{s}{\\sqrt{n}}' },
    { desc: '오차율', symbol: '오차율', ex: '오차율', source: '\\text{오차율} = \\frac{\\text{오차}}{\\text{참값}} \\times 100\\%' },
    { desc: '상대오차', symbol: '상대오차', ex: '상대오차', source: '\\text{상대오차} = \\frac{\\text{오차}}{\\text{측정값}} \\times 100\\%' },
    { desc: '표준오차', symbol: '표준오차', ex: '표준오차', source: 'SE = \\frac{s}{\\sqrt{n}}' },
    { desc: '상관계수', symbol: '상관계수', ex: '상관계수', source: 'r = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}' },
    { desc: '정적분', symbol: '정적분', ex: '정적분', source: '\\int_{a}^{b} f(x) \\, dx' },
    { desc: '미적분학의 제1기본정리', symbol: '미적분학의 제1기본정리', ex: '미적분학의 제1기본정리', source: '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)' },
    { desc: '오일러 상수', symbol: '오일러 상수', ex: '오일러 상수', source: '\\gamma = \\lim_{n \\to \\infty} \\left( \\sum_{k=1}^{n} \\frac{1}{k} - \\ln n \\right)' },
    { desc: '적분 넓이', symbol: '적분 넓이', ex: '적분 넓이', source: '\\int_{a}^{b} f(x) \\, dx' },
    { desc: '미적분학의 제2기본정리', symbol: '미적분학의 제2기본정리', ex: '미적분학의 제2기본정리', source: '\\frac{d}{dx} \\int_{a}^{x} f(t) \\, dt = f(x)' },
    { desc: '미분의 성질', symbol: '미분의 성질', ex: '미분의 성질', source: '\\frac{d}{dx} [f(x) + g(x)] = f\'(x) + g\'(x)' },
    { desc: '사다리꼴', symbol: '사다리꼴', ex: '사다리꼴', source: 'A = \\frac{1}{2} (a + b) h' },
    { desc: '역함수 미분', symbol: '역함수 미분', ex: '역함수 미분', source: '\\frac{d}{dx} f^{-1}(x) = \\frac{1}{f\'(f^{-1}(x))}' },
    { desc: '속력', symbol: '속력', ex: '속력', source: 'v = \\frac{d}{t}' },
    { desc: '역함수', symbol: '역함수', ex: '역함수', source: 'f(f^{-1}(x)) = x' },
    { desc: '유리함수 미분', symbol: '유리함수 미분', ex: '유리함수 미분', source: '\\frac{d}{dx} \\left( \\frac{u}{v} \\right) = \\frac{v u\' - u v\'}{v^2}' },
    { desc: '부정적분의 정의', symbol: '부정적분의 정의', ex: '부정적분의 정의', source: '\\int f(x) \\, dx = F(x) + C' },
    { desc: '유리함수 부정적분', symbol: '유리함수 부정적분', ex: '유리함수 부정적분', source: '\\int \\frac{u}{v} \\, dx' },
    { desc: '부분적분', symbol: '부분적분', ex: '부분적분', source: '\\int u \\, dv = uv - \\int v \\, du' },
    { desc: '정적분의 정의', symbol: '정적분의 정의', ex: '정적분의 정의', source: '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)' },
    { desc: '유리함수 정적분', symbol: '유리함수 정적분', ex: '유리함수 정적분', source: '\\int_{a}^{b} \\frac{u}{v} \\, dx' },
    { desc: '무리함수 적분', symbol: '무리함수 적분', ex: '무리함수 적분', source: '\\int \\sqrt{x} \\, dx = \\frac{2}{3} x^{3/2} + C' },
    { desc: '무리함수 정적분', symbol: '무리함수 정적분', ex: '무리함수 정적분', source: '\\int_{a}^{b} \\sqrt{x} \\, dx' },
    { desc: '로그의 정의', symbol: '로그의 정의', ex: '로그의 정의', source: '\\log_b x = y \\iff b^y = x' },
    { desc: '로그의 성질', symbol: '로그의 성질', ex: '로그의 성질', source: '\\log_b (xy) = \\log_b x + \\log_b y' },
    { desc: '로그의 밑 변환', symbol: '로그의 밑 변환', ex: '로그의 밑 변환', source: '\\log_b x = \\frac{\\log_k x}{\\log_k b}' },
    { desc: '로그함수 정적분', symbol: '로그함수 정적분', ex: '로그함수 정적분', source: '\\int_{a}^{b} \\log_b x \\, dx' },
    { desc: '로그함수 미분', symbol: '로그함수 미분', ex: '로그함수 미분', source: '\\frac{d}{dx} \\log_b x = \\frac{1}{x \\ln b}' },
    { desc: '로그함수 적분', symbol: '로그함수 적분', ex: '로그함수 적분', source: '\\int \\log_b x \\, dx' },
    { desc: '자연로그', symbol: '자연로그', ex: '자연로그', source: '\\ln x' },
    { desc: '지수함수 미분', symbol: '지수함수 미분', ex: '지수함수 미분', source: '\\frac{d}{dx} a^x = a^x \\ln a' },
    { desc: '지수함수 부정적분', symbol: '지수함수 부정적분', ex: '지수함수 부정적분', source: '\\int a^x \\, dx = \\frac{a^x}{\\ln a} + C' },
    { desc: '지수함수 정적분', symbol: '지수함수 정적분', ex: '지수함수 정적분', source: '\\int_{a}^{b} a^x \\, dx' },
    { desc: '오일러 공식', symbol: '오일러 공식', ex: '오일러 공식', source: 'e^{ix} = \\cos x + i \\sin x' },
    { desc: '오일러의 수', symbol: '오일러의 수', ex: '오일러의 수', source: 'e \\approx 2.718' },
    { desc: '오일러 상수', symbol: '오일러 상수', ex: '오일러 상수', source: '\\gamma = 0.57721' },
    { desc: '오일러의 수를 구하는 공식', symbol: '오일러의 수를 구하는 공식', ex: '오일러의 수를 구하는 공식', source: 'e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n' },
    { desc: '오일러 상수를 도출하는 공식', symbol: '오일러 상수를 도출하는 공식', ex: '오일러 상수를 도출하는 공식', source: '\\gamma = \\lim_{n \\to \\infty} \\left( \\sum_{k=1}^{n} \\frac{1}{k} - \\ln n \\right)' },
    { desc: '삼각함수 합차 공식', symbol: '삼각함수 합차 공식', ex: '삼각함수 합차 공식', source: '\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b' },
    { desc: '삼각비의 정의', symbol: '삼각비의 정의', ex: '삼각비의 정의', source: '\\sin \\theta = \\frac{\\text{대변}}{\\text{빗변}}, \\quad \\cos \\theta = \\frac{\\text{밑변}}{\\text{빗변}}, \\quad \\tan \\theta = \\frac{\\text{대변}}{\\text{밑변}}' },
    { desc: '삼각함수 정적분', symbol: '삼각함수 정적분', ex: '삼각함수 정적분', source: '\\int_{a}^{b} \\sin x \\, dx, \\quad \\int_{a}^{b} \\cos x \\, dx' },
    { desc: '삼각함수 곱셈 공식', symbol: '삼각함수 곱셈 공식', ex: '삼각함수 곱셈 공식', source: '\\sin a \\sin b = \\frac{1}{2} [\\cos(a - b) - \\cos(a + b)]' },
    { desc: '삼각함수의 정의', symbol: '삼각함수의 정의', ex: '삼각함수의 정의', source: '\\sin \\theta, \\quad \\cos \\theta, \\quad \\tan \\theta' },
    { desc: '삼각함수 제곱 공식', symbol: '삼각함수 제곱 공식', ex: '삼각함수 제곱 공식', source: '\\sin^2 \\theta + \\cos^2 \\theta = 1' },
    { desc: '특수각 삼각비', symbol: '특수각 삼각비', ex: '특수각 삼각비', source: '\\sin 30^\\circ = \\frac{1}{2}, \\quad \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}, \\quad \\tan 30^\\circ = \\frac{1}{\\sqrt{3}}' },
    { desc: '삼각함수 합성', symbol: '삼각함수 합성', ex: '삼각함수 합성', source: 'a \\sin x + b \\cos x = R \\sin(x + \\alpha)' },
    { desc: '반각 공식', symbol: '반각 공식', ex: '반각 공식', source: '\\sin \\frac{\\theta}{2} = \\pm \\sqrt{\\frac{1 - \\cos \\theta}{2}}, \\quad \\cos \\frac{\\theta}{2} = \\pm \\sqrt{\\frac{1 + \\cos \\theta}{2}}' },
    { desc: '삼각함수 변환', symbol: '삼각함수 변환', ex: '삼각함수 변환', source: '\\sin(\\pi - \\theta) = \\sin \\theta, \\quad \\cos(\\pi - \\theta) = -\\cos \\theta' },
    { desc: '배각 공식', symbol: '배각 공식', ex: '배각 공식', source: '\\sin 2\\theta = 2 \\sin \\theta \\cos \\theta, \\quad \\cos 2\\theta = \\cos^2 \\theta - \\sin^2 \\theta' },
    { desc: '삼배각 공식', symbol: '삼배각 공식', ex: '삼배각 공식', source: '\\sin 3\\theta = 3 \\sin \\theta - 4 \\sin^3 \\theta' },
    { desc: '삼각함수 덧셈 공식', symbol: '삼각함수 덧셈 공식', ex: '삼각함수 덧셈 공식', source: '\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b' },
    { desc: '사인 공식', symbol: '사인 공식', ex: '사인 공식', source: '\\sin \\theta = \\frac{\\text{대변}}{\\text{빗변}}' },
    { desc: '코사인 공식', symbol: '코사인 공식', ex: '코사인 공식', source: '\\cos \\theta = \\frac{\\text{밑변}}{\\text{빗변}}' },
    { desc: '탄젠트 공식', symbol: '탄젠트 공식', ex: '탄젠트 공식', source: '\\tan \\theta = \\frac{\\text{대변}}{\\text{밑변}}' },
    { desc: '사인 법칙', symbol: '사인 법칙', ex: '사인 법칙', source: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}' },
    { desc: '제1코사인 법칙', symbol: '제1코사인 법칙', ex: '제1코사인 법칙', source: 'c^2 = a^2 + b^2 - 2ab \\cos C' },
    { desc: '제2코사인 법칙', symbol: '제2코사인 법칙', ex: '제2코사인 법칙', source: 'a^2 = b^2 + c^2 - 2bc \\cos A' },
    { desc: '탄젠트 법칙', symbol: '탄젠트 법칙', ex: '탄젠트 법칙', source: '\\frac{a - b}{a + b} = \\frac{\\tan \\frac{A - B}{2}}{\\tan \\frac{A + B}{2}}' },
    { desc: '삼각함수 미분', symbol: '삼각함수 미분', ex: '삼각함수 미분', source: '\\frac{d}{dx} \\sin x = \\cos x, \\quad \\frac{d}{dx} \\cos x = -\\sin x' },
    { desc: '역삼각함수 미분', symbol: '역삼각함수 미분', ex: '역삼각함수 미분', source: '\\frac{d}{dx} \\sin^{-1} x = \\frac{1}{\\sqrt{1 - x^2}}, \\quad \\frac{d}{dx} \\cos^{-1} x = -\\frac{1}{\\sqrt{1 - x^2}}' },
    { desc: '삼각함수 적분', symbol: '삼각함수 적분', ex: '삼각함수 적분', source: '\\int \\sin x \\, dx = -\\cos x + C, \\quad \\int \\cos x \\, dx = \\sin x + C' },
    { desc: '삼각함수 정적분', symbol: '삼각함수 정적분', ex: '삼각함수 정적분', source: '\\int_{a}^{b} \\sin x \\, dx, \\quad \\int_{a}^{b} \\cos x \\, dx' },
    // 기타
    { desc: '질량-에너지 등가 원리', symbol: '질량-에너지 등가 원리', ex: '질량-에너지 등가 원리', source: 'E = mc^2' },
    { desc: '시간 지연', symbol: '시간 지연', ex: '시간 지연', source: '\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - \\frac{v^2}{c^2}}}' },
    { desc: '길이 수축', symbol: '길이 수축', ex: '길이 수축', source: 'L = L_0 \\sqrt{1 - \\frac{v^2}{c^2}}' },
    { desc: '로렌츠 변환 시간', symbol: '로렌츠 변환 시간', ex: '로렌츠 변환 시간', source: "t' = \\gamma \\left( t - \\frac{vx}{c^2} \\right)" },
    { desc: '로렌츠 변환 공간 x', symbol: '로렌츠 변환 공간 x', ex: '로렌츠 변환 공간 x', source: "x' = \\gamma (x - vt)" },
    { desc: '로렌츠 변환 공간 y', symbol: '로렌츠 변환 공간 y', ex: '로렌츠 변환 공간 y', source: "y' = y" },
    { desc: '로렌츠 변환 공간 z', symbol: '로렌츠 변환 공간 z', ex: '로렌츠 변환 공간 z', source: "z' = z" },
    { desc: '로렌츠 인자', symbol: '로렌츠 인자', ex: '로렌츠 인자', source: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}' },
    { desc: '아인슈타인 장 방정식', symbol: '아인슈타인 장 방정식', ex: '아인슈타인 장 방정식', source: 'R_{\\mu\\nu} - \\frac{1}{2}Rg_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}' },
    { desc: '시간 변환', symbol: '시간 변환', ex: '시간 변환', source: "t' = \\gamma \\left( t - \\frac{vx}{c^2} \\right)" },
    { desc: '공간 변환 x', symbol: '공간 변환 x', ex: '공간 변환 x', source: "x' = \\gamma (x - vt)" },
    { desc: '공간 변환 y', symbol: '공간 변환 y', ex: '공간 변환 y', source: "y' = y" },
    { desc: '공간 변환 z', symbol: '공간 변환 z', ex: '공간 변환 z', source: "z' = z" },

    { symbol: 'times', source: "a \\times b", desc: '곱셈' },
    { symbol: 'div', source: "a \\div b", desc: '나눗셈' },
    { symbol: 'cdot', source: "a \\cdot b", desc: '곱셈' },
    { symbol: 'ast', source: "a \\ast b", desc: '곱셈' },
    { symbol: 'circ', source: "a \\circ b", desc: '곱셈' },
    { symbol: 'oplus', source: "a \\oplus b", desc: '곱셈' },
    { symbol: 'otimes', source: "a \\otimes b", desc: '곱셈' },
    { symbol: 'oslash', source: "a \\oslash b", desc: '곱셈' },
    { symbol: '\\\\', source: 'a\\ b', desc: '공백' },
    { symbol: '%', source: '\\%', desc: '퍼센트' },
    { symbol: '(', source: '( )', desc: '괄호' },
    { symbol: '', source: "\\left(\\LARGE{AB}\\right)", desc: '괄호' },
    { symbol: '\.', source: '\\text{\\.{a}}', desc: '괄호' },
    { symbol: '', source: "\\text{\\'{ a }}", desc: 'prime' },
    { symbol: '_', source: "x_i", desc: '아래첨자' },
    { symbol: '~', source: "\\vec{F}", desc: 'vector' },
    { symbol: '^', source: "x^2", desc: '지수' },
    { symbol: 'sqrt', source: "\\sqrt{a^2 + b^2}", desc: '제곱근' },
    { symbol: 'frac', source: "\\frac{a}{b}", desc: '분수' },
    { symbol: 'sum', source: "\\sum_{n=1}^{\\infty} 2^{-n}", desc: '시그마' },
    { symbol: 'prod', source: "\\prod_{k=1}^n k", desc: '곱셈' },
    { desc: '일반 수식', symbol: '수식', ex: '수식', source: '45^\\circ' },
    { desc: '일반 수식', symbol: '수식', ex: '수식', source: '0\\cdots100' },
    { desc: '일반 수식', symbol: '수식', ex: '수식', source: '0\\dots100' },
    { desc: '일반 수식', symbol: '수식', ex: '수식', source: '\\{ 1 + 2 \\}' },
    { desc: '일반 수식', symbol: '수식', ex: '수식', source: 'c = \\pm\\sqrt{a^2 + b^2}' },

    { desc: '일반 수식', symbol: '계승', ex: '계승', source: 'n! = 1 \\times 2 \\times 3 \\times 4 \\ldots n' },
    { desc: '일반 수식', symbol: '계승', ex: '계승', source: 'n! = \\ prod_{k=1}^n k' },
    { desc: '일반 수식', symbol: '제곱근', ex: '제곱근', source: '\\sqrt{2}' },
    { desc: '일반 수식', symbol: '행렬', ex: '행렬', source: 'A=\\begin{bmatrix}1&2&3\\cr4&5&6\\end{bmatrix}' },
    { desc: '일반 수식', symbol: '적분', ex: '적분', source: 'A=\\int_1^4\\frac{x^2}{x} dx' },

    // 삼각함수 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\sin(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\cos(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\tan(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\cot(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\sec(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\csc(\\theta)' },
    { symbol: 'sin', source: "\\sin", desc: '사인' },
    { symbol: 'cos', source: "\\cos", desc: '코사인' },
    { symbol: 'tan', source: "\\tan", desc: '탄젠트' },
    { symbol: 'cot', source: "\\cot", desc: '코탄젠트' },
    { symbol: 'sec', source: "\\sec", desc: '시컨트' },
    { symbol: 'csc', source: "\\csc", desc: '코시컨트' },
    { symbol: 'arcsin', source: "\\arcsin", desc: '역사인' },
    { symbol: 'arccos', source: "\\arccos", desc: '역코사인' },
    { symbol: 'arctan', source: "\\arctan", desc: '역탄젠트' },
    { symbol: 'cosh', source: "\\cosh", desc: '하이퍼볼릭 코사인' },
    { symbol: 'tanh', source: "\\tanh", desc: '하이퍼볼릭 탄젠트' },
    { symbol: 'coth', source: "\\coth", desc: '하이퍼볼릭 코탄젠트' },
    //  대수학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { symbol: 'equiv', source: "\\equiv", desc: '동치' },
    // { symbol: 'nequiv', source: "\\nequiv", desc: '동치하지 않음' },
    { symbol: 'cong', source: "\\cong", desc: '동형' },
    { symbol: 'approx', source: "\\approx", desc: '비슷한' },
    { symbol: 'simeq', source: "\\simeq", desc: '비슷한' },
    { symbol: 'sim', source: "\\sim", desc: '비슷한' },
    { symbol: 'propto', source: "\\propto", desc: '비례' },
    { symbol: 'varpropto', source: "\\varpropto", desc: '비례' },
    { symbol: 'parallel', source: "\\parallel", desc: '평행' },
    { symbol: 'nparallel', source: "\\nparallel", desc: '평행하지 않음' },
    { symbol: 'perp', source: "\\perp", desc: '수직' },
    { symbol: 'mid', source: "\\mid", desc: '수직' },
    { symbol: 'nmid', source: "\\nmid", desc: '수직하지 않음' },
    { symbol: 'vdash', source: "\\vdash", desc: '수직' },
    { symbol: 'dashv', source: "\\dashv", desc: '수직' },
    { symbol: 'bowtie', source: "\\bowtie", desc: '수직' },
    { symbol: 'in', source: "\\in", desc: '소속' },
    { symbol: 'ni', source: "\\ni", desc: '소속' },
    { symbol: 'notin', source: "\\notin", desc: '소속하지 않음' },
    { symbol: 'subset', source: "\\subset", desc: '부분집합' },
    { symbol: 'subseteq', source: "\\subseteq", desc: '부분집합 또는 같음' },
    { symbol: 'supset', source: "\\supset", desc: '상위집합' },
    // 미적분학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { symbol: 'int', source: "\\int", desc: '적분' },
    { symbol: 'oint', source: "\\oint", desc: '폐곡선적분' },
    { symbol: 'iint', source: "\\iint", desc: '이중적분' },
    { symbol: 'iiint', source: "\\iiint", desc: '삼중적분' },
    { symbol: 'int', source: "\\int_1^4\\frac{x^2}{x} dx", desc: '적분' },
    { symbol: 'oint', source: "\\oint_1^4\\frac{x^2}{x} dx", desc: '폐곡선적분' },
    { symbol: 'iint', source: "\\iint_1^4\\frac{x^2}{x} dx", desc: '이중적분' },
    { symbol: 'iiint', source: "\\iiint_1^4\\frac{x^2}{x} dx", desc: '삼중적분' },
    // 집합론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { symbol: 'forall', source: "\\forall", desc: '모든' },
    { symbol: 'exists', source: "\\exists", desc: '존재' },
    { symbol: 'nexists', source: "\\nexists", desc: '존재하지 않음' },
    { symbol: 'in', source: "\\in", desc: '소속' },
    { symbol: 'notin', source: "\\notin", desc: '소속하지 않음' },
    { symbol: 'subset', source: "\\subset", desc: '부분집합' },
    { symbol: 'subseteq', source: "\\subseteq", desc: '부분집합 또는 같음' },
    { symbol: 'supset', source: "\\supset", desc: '상위집합' },
    { symbol: 'supseteq', source: "\\supseteq", desc: '상위집합 또는 같음' },
    { symbol: 'emptyset', source: "\\emptyset", desc: '공집합' },
    { symbol: 'nabla', source: "\\nabla", desc: '나블라' },
    { symbol: 'partial', source: "\\partial", desc: '편미분' },
    { symbol: 'infty', source: "\\infty", desc: '무한대' },
    { symbol: 'aleph', source: "\\aleph", desc: '알레프' },
    { symbol: 'neg', source: "\\neg", desc: '부정' },
    { symbol: 'land', source: "\\land", desc: '논리곱' },
    { symbol: 'to', source: "\\to", desc: '함수' },
    { symbol: 'mapsto', source: "\\mapsto", desc: '함수' },
    { symbol: 'injlim', source: "\\injlim", desc: '직합' },
    { symbol: 'projlim', source: "\\projlim", desc: '투영' },
    // 논리학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { symbol: 'land', source: "\\land", desc: '논리곱' },
    { symbol: 'lor', source: "\\lor", desc: '논리합' },
    { symbol: 'lnot', source: "\\lnot", desc: '논리부정' },
    { symbol: 'land', source: "\\land", desc: '논리곱' },

    // 일반 수식 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { symbol: 'pm', source: "c = \\pm\\sqrt{a^2 + b^2}", desc: '±' },
    { symbol: '', source: 'a \\colon b', desc: '팩토리얼' },
    { symbol: '!', source: 'n!', desc: '팩토리얼' },

    { symbol: 'int', source: "\\int_1^4\\frac{x^2}{x} dx", desc: '적분' },
    { symbol: 'lim', source: "\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x", desc: '극한' },
    { symbol: 'log', source: "\\log_2 8", desc: '로그' },
    { symbol: 'binom', source: "\\binom{n}{k}", desc: '이항계수' },

    // 논문기호 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\alpha' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\beta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\gamma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\delta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\epsilon' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\zeta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\eta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\theta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\iota' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\kappa' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\lambda' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\mu' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\nu' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\xi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\pi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\rho' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\sigma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\tau' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\upsilon' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\phi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\chi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\psi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\omega' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varepsilon' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\vartheta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varpi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varrho' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varsigma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varphi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Gamma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Delta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Theta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Lambda' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Xi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Pi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Sigma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Upsilon' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Phi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Psi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\Omega' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\digamma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varkappa' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varTheta' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varLambda' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varXi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varPi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varSigma' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varUpsilon' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varPhi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varPsi' },
    { desc: '논문기호', symbol: '논문기호', ex: '논문기호', source: '\\varOmega' },


    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\sin(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\cos(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\tan(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\cot(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\sec(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\csc(\\theta)' },
    { symbol: 'sin', source: "\\sin", desc: '사인' },
    { symbol: 'cos', source: "\\cos", desc: '코사인' },
    { symbol: 'tan', source: "\\tan", desc: '탄젠트' },
    { symbol: 'cot', source: "\\cot", desc: '코탄젠트' },
    { symbol: 'sec', source: "\\sec", desc: '시컨트' },
    { symbol: 'csc', source: "\\csc", desc: '코시컨트' },
    { symbol: 'arcsin', source: "\\arcsin", desc: '역사인' },
    { symbol: 'arccos', source: "\\arccos", desc: '역코사인' },
    { symbol: 'arctan', source: "\\arctan", desc: '역탄젠트' },
    { symbol: 'cosh', source: "\\cosh", desc: '하이퍼볼릭 코사인' },
    { symbol: 'tanh', source: "\\tanh", desc: '하이퍼볼릭 탄젠트' },
    { symbol: 'coth', source: "\\coth", desc: '하이퍼볼릭 코탄젠트' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\pi' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\frac{\\pi}{2}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\frac{\\pi}{3}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\frac{\\pi}{4}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\frac{\\pi}{6}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\frac{3\\pi}{2}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '2\\pi' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\theta = \\frac{s}{r}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\theta = \\frac{\\pi}{180} \\times \\text{degrees}' },
    { desc: '라디안', symbol: '라디안', ex: '라디안', source: '\\text{degrees} = \\frac{180}{\\pi} \\times \\theta' },

    { desc: '덧셈', symbol: '덧셈', ex: '덧셈', source: 'a + b = c' },
    { desc: '뺄셈', symbol: '뺄셈', ex: '뺄셈', source: 'a - b = c' },
    { desc: '곱셈', symbol: '곱셈', ex: '곱셈', source: 'a \\times b = c' },
    { desc: '나눗셈', symbol: '나눗셈', ex: '나눗셈', source: '\\frac{a}{b} = c' },
    { desc: '거듭제곱', symbol: '거듭제곱', ex: '거듭제곱', source: 'a^n' },
    { desc: '제곱근', symbol: '제곱근', ex: '제곱근', source: '\\sqrt{a}' },
    { desc: '이차방정식', symbol: '이차방정식', ex: '이차방정식', source: 'ax^2 + bx + c = 0' },
    { desc: '이차방정식의 근', symbol: '이차방정식의 근', ex: '이차방정식의 근', source: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { desc: '피타고라스 정리', symbol: '피타고라스 정리', ex: '피타고라스 정리', source: 'a^2 + b^2 = c^2' },
    { desc: '삼각형의 넓이', symbol: '삼각형의 넓이', ex: '삼각형의 넓이', source: '\\frac{1}{2} \\times base \\times height' },
    { desc: '사각형의 넓이', symbol: '사각형의 넓이', ex: '사각형의 넓이', source: 'length \\times width' },
    { desc: '원의 넓이', symbol: '원의 넓이', ex: '원의 넓이', source: '\\pi r^2' },
    { desc: '원의 둘레', symbol: '원의 둘레', ex: '원의 둘레', source: '2 \\pi r' },
    { desc: '직육면체의 부피', symbol: '직육면체의 부피', ex: '직육면체의 부피', source: 'length \\times width \\times height' },
    { desc: '구의 부피', symbol: '구의 부피', ex: '구의 부피', source: '\\frac{4}{3} \\pi r^3' },
    { desc: '구의 겉넓이', symbol: '구의 겉넓이', ex: '구의 겉넓이', source: '4 \\pi r^2' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\sin(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\cos(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\tan(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\cot(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\sec(\\theta)' },
    { desc: '삼각함수', symbol: '삼각함수', ex: '삼각함수', source: '\\csc(\\theta)' },
    { desc: '확률', symbol: '확률', ex: '확률', source: 'P(A) = \\frac{n(A)}{n(S)}' },
    { desc: '통계 - 평균', symbol: '통계 - 평균', ex: '통계 - 평균', source: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i' },
    { desc: '통계 - 중앙값', symbol: '통계 - 중앙값', ex: '통계 - 중앙값', source: '\\text{Median} = \\text{중앙값}' },
    { desc: '통계 - 최빈값', symbol: '통계 - 최빈값', ex: '통계 - 최빈값', source: '\\text{Mode} = \\text{최빈값}' },
    { desc: '통계 - 분산', symbol: '통계 - 분산', ex: '통계 - 분산', source: '\\sigma^2 = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2' },
    { desc: '통계 - 표준편차', symbol: '통계 - 표준편차', ex: '통계 - 표준편차', source: '\\sigma = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2}' },

    { desc: '피보나치 수열', symbol: '피보나치 수열', ex: '피보나치 수열', source: 'F(n) = F(n-1) + F(n-2)' },
    { desc: '피보나치 수열 초기 조건', symbol: '피보나치 수열 초기 조건', ex: '피보나치 수열 초기 조건', source: 'F(0) = 0, \\quad F(1) = 1' },
    // 미적분학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)


    // 기하학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)


    // 논리학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 집합론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 수론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 대수학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 해석학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 위상수학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 미분방정식 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 확률론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)


    // 통계학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)


    // 수치해석 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 이산수학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 선형대수학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 텐서해석 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 함수해석 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 복소수해석 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)
    { symbol: 'Re', source: "\\Re", desc: '실수부' },
    { symbol: 'Im', source: "\\Im", desc: '허수부' },
    { symbol: 'arg', source: "\\arg", desc: '허수부' },

    // 함수에 관한 KaTeX 표현식
    { desc: '함수 정의', symbol: '함수 정의', ex: '함수 정의', source: 'f(x)' },
    { desc: '합성 함수', symbol: '합성 함수', ex: '합성 함수', source: '(f \\circ g)(x) = f(g(x))' },
    { desc: '역함수', symbol: '역함수', ex: '역함수', source: 'f^{-1}(x)' },
    { desc: '미분', symbol: '미분', ex: '미분', source: '\\frac{d}{dx} f(x)' },
    { desc: '적분', symbol: '적분', ex: '적분', source: '\\int f(x) \\, dx' },
    { desc: '정적분', symbol: '정적분', ex: '정적분', source: '\\int_{a}^{b} f(x) \\, dx' },
    { desc: '부분적분', symbol: '부분적분', ex: '부분적분', source: '\\int u \\, dv = uv - \\int v \\, du' },
    { desc: '테일러 급수', symbol: '테일러 급수', ex: '테일러 급수', source: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n' },
    { desc: '맥클로린 급수', symbol: '맥클로린 급수', ex: '맥클로린 급수', source: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n' },
    { desc: '라플라스 변환', symbol: '라플라스 변환', ex: '라플라스 변환', source: '\\mathcal{L}\\{f(t)\\} = \\int_{0}^{\\infty} e^{-st} f(t) \\, dt' },
    { desc: '푸리에 변환', symbol: '푸리에 변환', ex: '푸리에 변환', source: '\\mathcal{F}\\{f(t)\\} = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} \\, dt' },


    // 함수에 관한 KaTeX 표현식
    { desc: '함수 정의', symbol: '함수 정의', ex: '함수 정의', source: 'f(x)' },
    { desc: '합성 함수', symbol: '합성 함수', ex: '합성 함수', source: '(f \\circ g)(x) = f(g(x))' },
    { desc: '역함수', symbol: '역함수', ex: '역함수', source: 'f^{-1}(x)' },
    { desc: '미분', symbol: '미분', ex: '미분', source: '\\frac{d}{dx} f(x)' },
    { desc: '적분', symbol: '적분', ex: '적분', source: '\\int f(x) \\, dx' },
    { desc: '정적분', symbol: '정적분', ex: '정적분', source: '\\int_{a}^{b} f(x) \\, dx' },
    { desc: '부분적분', symbol: '부분적분', ex: '부분적분', source: '\\int u \\, dv = uv - \\int v \\, du' },
    { desc: '테일러 급수', symbol: '테일러 급수', ex: '테일러 급수', source: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n' },
    { desc: '맥클로린 급수', symbol: '맥클로린 급수', ex: '맥클로린 급수', source: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n' },
    { desc: '라플라스 변환', symbol: '라플라스 변환', ex: '라플라스 변환', source: '\\mathcal{L}\\{f(t)\\} = \\int_{0}^{\\infty} e^{-st} f(t) \\, dt' },
    { desc: '푸리에 변환', symbol: '푸리에 변환', ex: '푸리에 변환', source: '\\mathcal{F}\\{f(t)\\} = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} \\, dt' },

    // 원의 방정식에 관한 KaTeX 표현식
    { desc: '표준형 원의 방정식', symbol: '표준형 원의 방정식', ex: '표준형 원의 방정식', source: '(x - h)^2 + (y - k)^2 = r^2' },
    { desc: '일반형 원의 방정식', symbol: '일반형 원의 방정식', ex: '일반형 원의 방정식', source: 'x^2 + y^2 + Dx + Ey + F = 0' },

    // 경우의 수에 관한 KaTeX 표현식
    { desc: '순열', symbol: '순열', ex: '순열', source: 'P(n, r) = \\frac{n!}{(n-r)!}' },
    { desc: '조합', symbol: '조합', ex: '조합', source: 'C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}' },
    { desc: '이항 정리', symbol: '이항 정리', ex: '이항 정리', source: '(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k' },

    // 조합론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 그래프이론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 조합론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 그래프이론 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)

    // 수리물리학 (https://en.wikipedia.org/wiki/List_of_mathematical_symbols_by_subject)


  ]

  @ViewChild('math') math: ElementRef

  rendered: {
    desc: string
    symbol: string,
    ex: string,
    source: string,
  }[] = [];

  katexRender() {

    // 수식 렌더링
    for (let item of this.mathA) {
      this.rendered.push({
        desc: item.desc,
        symbol: item.symbol,
        ex: item.source,
        source: katex.renderToString(item.source),
      });
    }

    // for (let i = 0; i < this.mathExpressions.length; i++) {
    //   // 렌더링된 수식을 배열에 저장
    //   this.renderedMathExpressions.push(katex.renderToString(this.mathExpressions[i]));
    // }

    // katex.render("\\sqrt{a^2 + b^2}", this.math.nativeElement, {
    //   displayMode: true,
    //   throwOnError: false,
    //   errorColor: '#cccc00',
    //   delimiters: [
    //     { left: '$$', right: '$$', display: true },
    //     { left: '\\[', right: '\\]', display: true },
    //     { left: '\\(', right: '\\)', display: false },
    //     { left: '$', right: '$', display: false }
    //   ]
    // });

    this.cdref.detectChanges(); // 수동으로 변경 감지 트리거
  }

  toKatex(source: string) {
    return katex.renderToString(source);
  }

  onCopyToClipboard() { }

  constructor() {

    this.route.queryParams.subscribe({
      next: (params) => {
        const id = params['id'];
        // const title = params['title'];
        const param = params['param'];
        // this.title = title;
        this.menuId = id;
        this.menuParam = param;
      },
      error: (_) => {
        this.menuId = 0;
        this.menuParam = false;
        this.title = 'Document';
      }
    });
  }


  ngOnInit(): void {
  }
  renderMath(): void {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }
  // nodes와 marks를 클래스 속성으로 정의
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.katexRender();
    });

    this.renderMath();

  }

  ngAfterContentChecked(): void {
    // this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
  }
}
