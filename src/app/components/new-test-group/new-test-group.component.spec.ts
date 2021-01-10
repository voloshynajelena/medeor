import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestGroupComponent } from './new-test-group.component';

describe('NewTestGroupComponent', () => {
  let component: NewTestGroupComponent;
  let fixture: ComponentFixture<NewTestGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTestGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTestGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
