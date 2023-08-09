import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-arrow',
  templateUrl: './scroll-arrow.component.html',
  styleUrls: ['./scroll-arrow.component.css']
})
export class ScrollArrowComponent
{
  currentPosition: number = 0;

  isHideArrow: boolean = true;

  @HostListener('window:scroll', ['$event.target']) onScrollEvent(e: any)
  {
    let scroll = e.scrollingElement.scrollTop;

    if (scroll > this.currentPosition)
    {
      // scroll down
      this.isHideArrow = false;

    } else
    {
      // scroll up
      this.isHideArrow = true;
    }
    this.currentPosition = scroll;
  }

  scroll(top:number = document.body.scrollHeight): void
  {
    if (top === -1) this.scrollTo(0, 10000);
    window.scrollTo({top: top, behavior: 'smooth'});
  }

  scrollTo(element: any, duration: number)
  {
    let e = document.documentElement;
    if (e.scrollTop === 0)
    {
      let t = e.scrollTop;
      ++e.scrollTop;
      e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    this.scrollToC(e, e.scrollTop, element, duration);
  }

  // Element to move, element or px from, element or px to, time in ms to animate
  scrollToC(element: any, from: any, to: any, duration: number)
  {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;

    this.scrollToX(element, from, to, 0, 1 / duration, 20, this.easeOutCuaic);
  }

  scrollToX(element: any, xFrom: any, xTo: any, t01: any, speed: number, step: any, motion: any)
  {
    if (t01 < 0 || t01 > 1 || speed <= 0)
    {
      element.scrollTop = xTo;
      return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;
    // debugger;
    setTimeout(() =>
    {
      this.scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
  }

  easeOutCuaic(t: any)
  {
    t--;
    return t * t * t + 1;
  }

}
