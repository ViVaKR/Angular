import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMembershipComponent } from './cancel-membership.component';

describe('CancelMembershipComponent', () => {
  let component: CancelMembershipComponent;
  let fixture: ComponentFixture<CancelMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelMembershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
