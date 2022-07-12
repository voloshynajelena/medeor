import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProfileComponent } from './test-profile.component';

describe('TestProfileComponent', () => {
  let component: TestProfileComponent;
  let fixture: ComponentFixture<TestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
