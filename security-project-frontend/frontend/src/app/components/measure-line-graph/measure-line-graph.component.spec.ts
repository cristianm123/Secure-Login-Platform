import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureLineGraphComponent } from './measure-line-graph.component';

describe('ActiveLineGraphComponent', () => {
  let component: MeasureLineGraphComponent;
  let fixture: ComponentFixture<MeasureLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
