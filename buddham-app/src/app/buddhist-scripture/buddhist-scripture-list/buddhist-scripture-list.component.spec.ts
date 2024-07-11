import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddhistScriptureListComponent } from './buddhist-scripture-list.component';

describe('BuddhistScriptureListComponent', () => {
  let component: BuddhistScriptureListComponent;
  let fixture: ComponentFixture<BuddhistScriptureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddhistScriptureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddhistScriptureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
