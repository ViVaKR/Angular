import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhistScriptureCreateComponent } from './buddhist-scripture-create.component';

describe('BuddhistScriptureCreateComponent', () => {
  let component: BuddhistScriptureCreateComponent;
  let fixture: ComponentFixture<BuddhistScriptureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddhistScriptureCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddhistScriptureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
