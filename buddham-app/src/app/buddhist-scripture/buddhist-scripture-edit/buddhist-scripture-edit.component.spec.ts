import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhistScriptureEditComponent } from './buddhist-scripture-edit.component';

describe('BuddhistScriptureEditComponent', () => {
  let component: BuddhistScriptureEditComponent;
  let fixture: ComponentFixture<BuddhistScriptureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddhistScriptureEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddhistScriptureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
