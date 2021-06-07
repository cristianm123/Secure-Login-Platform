import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeMeasureLineGraphComponent } from './comparative-measure-line-graph.component';

describe('ActiveReactiveLineGraphComponent', () => {
  let component: ComparativeMeasureLineGraphComponent;
  let fixture: ComponentFixture<ComparativeMeasureLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativeMeasureLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeMeasureLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
