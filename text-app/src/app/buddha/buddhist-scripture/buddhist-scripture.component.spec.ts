import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhistScriptureComponent } from './buddhist-scripture.component';

describe('BuddhistScriptureComponent', () => {
  let component: BuddhistScriptureComponent;
  let fixture: ComponentFixture<BuddhistScriptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddhistScriptureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddhistScriptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
