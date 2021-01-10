import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedTestsTableComponent } from './grouped-tests-table.component';

describe('GroupedTestsTableComponent', () => {
  let component: GroupedTestsTableComponent;
  let fixture: ComponentFixture<GroupedTestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedTestsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedTestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
