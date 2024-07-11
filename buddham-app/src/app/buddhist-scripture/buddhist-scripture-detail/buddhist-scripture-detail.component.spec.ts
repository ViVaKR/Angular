import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhistScriptureDetailComponent } from './buddhist-scripture-detail.component';

describe('BuddhistScriptureDetailComponent', () => {
  let component: BuddhistScriptureDetailComponent;
  let fixture: ComponentFixture<BuddhistScriptureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddhistScriptureDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddhistScriptureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
