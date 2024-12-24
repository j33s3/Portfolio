import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPersonalComponent } from './work-personal.component';

describe('WorkPersonalComponent', () => {
  let component: WorkPersonalComponent;
  let fixture: ComponentFixture<WorkPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
