import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '@app/services/action.service';
import { LoadingService } from '@app/services/loading.service';

@Component({
  selector: 'app-ball-transform',
  standalone: true,
  imports: [],
  templateUrl: './ball-transform.component.html',
  styleUrl: './ball-transform.component.scss'
})
export class BallTransformComponent implements OnInit, AfterViewInit {
  title = 'Ball Transform';
  @ViewChild('container') container!: ElementRef;
  numBalls: number = 50; // 생성할 볼의 개수
  balls: any[] = []; // 볼을 담을 배열{

  ballRadius: number = 25; // 볼의 반지름
  startY: number = 0; // 볼이 생성될 y 좌표
  interval: number = 0; // 각 볼의 초기 타이머 간격

  actionService = inject(ActionService);
  loadingService = inject(LoadingService);

  ngAfterViewInit(): void {

    this.startY = this.container.nativeElement.clientHeight; // 볼이 생성될 y 좌표
    this.interval = this.container.nativeElement.clientHeight / this.numBalls; // 각 볼의 초기 타이머 간격
    for (let i = 0; i < this.numBalls; i++) { // 볼을 생성하고 배열에 담는다.
      // 볼을 생성하고 스타일을 설정한다.
      let ball: HTMLImageElement = document.createElement('img'); // img 엘리먼트를 생성한다.
      ball.src = 'avata.png'; // 볼 이미지를 설정한다.
      ball.style.width = this.ballRadius * 2 + 'px'; // 볼의 너비를 설정한다.
      ball.style.height = this.ballRadius * 2 + 'px'; // 볼의 높이를 설정한다.
      ball.style.borderRadius = '50%'; // 볼의 모양을 원으로 설정한다.
      ball.classList.add('ball'); // 볼 클래스를 추가한다.
      ball.style.position = 'absolute'; // 볼의 위치를 설정한다.
      // ball.style.transition = 'transform 0.5s ease'; // 회전 애니메이션을 부드럽게 설정한다.


      this.container.nativeElement.appendChild(ball); // 볼을 container에 추가한다.

      this.balls.push({ // 볼을 배열에 추가한다.
        element: ball, // 각 볼의 엘리먼트
        timer: i * this.interval, //this.interval, // 각 볼의 초기 y 좌표
        randomX: (Math.random() * (this.container.nativeElement.clientWidth - 200)) + 50, // 각 볼의 초기 x 좌표
        speed: Math.random() * 3 + 2, // 각 볼의 속도를 랜덤하게 설정
        rotation: 0
      });
    }

    // 다음 프레임을 요청한다.
    requestAnimationFrame(this.render.bind(this));
  }

  render() {
    // 각 볼의 위치를 업데이트한다.
    this.balls.forEach(ball => {
      //ball.rotation += (ball.targetRotation - ball.rotation) * 0.1; // 회전값을 부드럽게 변경한다.
      ball.element.style.transform =
        `translate(${ball.randomX}px, ${this.startY - ball.timer}px) rotate(${ball.rotation}deg)`;
      ball.timer += ball.speed; // 타이머 값을 증가시킨다.
      if (ball.timer > this.startY) { // 타이머 값이 y 좌표보다 커지면, 타이머 값을 0으로 설정하고 x 좌표를 랜덤하게 설정한다.
        ball.timer = 0; // 타이머 값을 0으로 설정한다.
        ball.randomX = (Math.random() * (this.container.nativeElement.clientWidth - 200)) + 50; // 볼의 x 좌표를 랜덤하게 설정한다.
      }
    });

    // 충돌 감지 및 회전 효과 적용
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        if (this.isColliding(this.balls[i], this.balls[j])) {
          if (this.balls[i].randomX < this.balls[j].randomX) { // 왼쪽 볼이 오른쪽 볼보다 더 늦게 생성되었을 때
            this.balls[i].randomX -= 30;
            this.balls[j].randomX += 30;
            this.balls[i].rotation -= (45 - 360); // 왼쪽 볼은 반시계방향 회전
            this.balls[j].rotation += (45 + 360); // 오른쪽 볼은 시계방향 회전

          }
          else if (this.balls[i].randomX > this.balls[j].randomX) {
            this.balls[i].randomX += 30;
            this.balls[j].randomX -= 30;
            this.balls[i].rotation += (45 + 360); // 오른쪽 볼은 시계방향 회전
            this.balls[j].rotation -= (45 - 360); // 왼쪽 볼은 반시계방향 회전

          }

          // 위치 및 속도 조정
          // if (this.balls[i].timer > this.balls[j].timer) {
          //   this.balls[i].randomX -= 3;
          //   this.balls[j].randomX += 2;

          // }
          // else {
          //   this.balls[i].randomX += 3;
          //   this.balls[i].randomX -= 2;
          // }

        }
      }
    }

    // 다음 프레임을 요청한다.
    requestAnimationFrame(this.render.bind(this));
  }
  isColliding(ball1: any, ball2: any): boolean {
    const rect1 = ball1.element.getBoundingClientRect();
    const rect2 = ball2.element.getBoundingClientRect();

    // 피타고라스 정리를 이용하여 두 볼 사이의 거리를 계산한다타
    const distance = Math.sqrt(
      Math.pow(rect1.x - rect2.x, 2) + Math.pow(rect1.y - rect2.y, 2)
    );
    // 두 볼 사이의 거리가 볼의 반지름 이하이면 충돌로 판단한다.
    return distance < this.ballRadius * 2;



  }

  ngOnInit(): void {
    this.loadingService.loadingOff();
    this.actionService.nextLoading(false);
  }
}
