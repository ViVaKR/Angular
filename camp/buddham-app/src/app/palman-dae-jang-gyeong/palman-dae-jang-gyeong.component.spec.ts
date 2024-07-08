import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmanDaeJangGyeongComponent } from './palman-dae-jang-gyeong.component';

describe('PalmanDaeJangGyeongComponent', () => {
  let component: PalmanDaeJangGyeongComponent;
  let fixture: ComponentFixture<PalmanDaeJangGyeongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalmanDaeJangGyeongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalmanDaeJangGyeongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
