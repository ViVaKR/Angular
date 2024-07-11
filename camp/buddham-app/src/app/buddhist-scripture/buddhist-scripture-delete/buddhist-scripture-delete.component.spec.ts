import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhistScriptureDeleteComponent } from './buddhist-scripture-delete.component';

describe('BuddhistScriptureDeleteComponent', () => {
  let component: BuddhistScriptureDeleteComponent;
  let fixture: ComponentFixture<BuddhistScriptureDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddhistScriptureDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddhistScriptureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
