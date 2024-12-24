import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSchoolComponent } from './work-school.component';

describe('WorkSchoolComponent', () => {
  let component: WorkSchoolComponent;
  let fixture: ComponentFixture<WorkSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
