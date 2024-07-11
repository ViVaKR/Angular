import { Component, Input } from '@angular/core';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  selector: 'app-buddhist-scripture-read',
  standalone: true,
  imports: [
    AllMatModule,
    HighlightAuto,
    HighlightLineNumbers
  ],
  templateUrl: './buddhist-scripture-read.component.html',
  styleUrl: './buddhist-scripture-read.component.scss'
})
export class BuddhistScriptureReadComponent {

  @Input() mainTitle?: string = '법구경';

  fontSize = 'text-xl';

  tabs = ['1 장', '2 장', '3 장', '4 장', '5 장'];


  increaseFontSize() {
    this.fontSize = 'text-3xl font-bold';
  }

  testString = `\n
존자 법구(法救) 지음
오(吳) 천축사문(天竺沙門) 유기난(維祇難) 등 한역

1. 무상품(無常品) [21장(章)]

「무상품」이란 탐욕으로 인하여 어둡고 어지러워지게 되었음을 깨닫게 하는 것이다. 영화와 목숨은 보전하기 어려운 것이요, 오직 도(道)만이 참답다는 것을 말한 것이다.

【1】
잠에서 깨어나라.
마땅히 기쁘게 생각하며
내 말을 듣고
부처님 말씀을 기록하라.

【2】
모든 행(行)은 덧없어
흥하고 쇠하는 법이라 하네.
대개 나면 이내 죽고 마니
이 멸(滅：滅度)만이 즐거움일세.

【3】
마치 저 옹기장이가
흙을 개어 그릇을 만들었어도
그것 모두 깨어지는 것처럼
사람의 목숨도 그러하니라.

【4】
비유하면 급히 흐르는 강물이
가버리면 다시는 돌아오지 않듯이
사람의 목숨도 이와 같아서
가고 나면 다시는 돌아오지 않는다.

【5】
마치 소 치는 사람이 채찍을 들고
소를 길러 잡아먹듯이
늙음과 죽음도 이와 같아서
기른 뒤엔 목숨을 앗아가네.

【6】
천 명이나 백 명 중에 한 사람이 아니라
모든 족성의 남자와 여자들이
아무리 재물을 쌓고 모아도
쇠하거나 잃지 않는 이 없네.

【7】
이 세상에 태어나 밤낮으로
목숨을 스스로 치고 깎다가
그 목숨 차츰 줄어 다함이
마치 저 잦아드는 옹달샘 같네.

【8】
항상할 것 같아도 모두 다 없어지고
높은 데 있는 것도 반드시 떨어지며
모이면 반드시 헤어짐이 있고
태어난 것은 언젠가는 죽고 만다.

【9】
중생들끼리 서로 이기려 다투다가
그 목숨마저 잃고 마나니
그 행위에 따라 떨어진 곳에서
스스로 재앙과 복을 받는다.

【10】
늙어서는 그 고통을 당하다가
죽으면 곧 의식도 없어진다.
집을 좋아해 감옥에 얽매어도
세상을 탐하여 끊지 못하네.
『법구경』 1권(ABC, K1021 v30, p.560c01)
  `;

}
