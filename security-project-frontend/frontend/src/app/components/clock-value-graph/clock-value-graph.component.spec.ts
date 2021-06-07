import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockValueGraphComponent } from './clock-value-graph.component';

describe('ClockValueGraphComponent', () => {
  let component: ClockValueGraphComponent;
  let fixture: ComponentFixture<ClockValueGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockValueGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockValueGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
