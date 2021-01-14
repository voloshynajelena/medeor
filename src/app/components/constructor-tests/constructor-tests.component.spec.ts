import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorTestsComponent } from './constructor-tests.component';

describe('ConstructorTestsComponent', () => {
  let component: ConstructorTestsComponent;
  let fixture: ComponentFixture<ConstructorTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
