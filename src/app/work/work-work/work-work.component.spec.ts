import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWorkComponent } from './work-work.component';

describe('WorkWorkComponent', () => {
  let component: WorkWorkComponent;
  let fixture: ComponentFixture<WorkWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
