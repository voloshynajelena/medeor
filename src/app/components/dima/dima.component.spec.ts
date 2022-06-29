import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimaComponent } from './dima.component';

describe('DimaComponent', () => {
  let component: DimaComponent;
  let fixture: ComponentFixture<DimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
