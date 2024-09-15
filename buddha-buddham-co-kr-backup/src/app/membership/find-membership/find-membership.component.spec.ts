import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMembershipComponent } from './find-membership.component';

describe('FindMembershipComponent', () => {
  let component: FindMembershipComponent;
  let fixture: ComponentFixture<FindMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindMembershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
