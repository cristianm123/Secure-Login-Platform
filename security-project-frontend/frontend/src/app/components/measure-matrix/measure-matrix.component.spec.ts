import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureMatrixComponent } from './measure-matrix.component';

describe('MeasureMatrixComponent', () => {
  let component: MeasureMatrixComponent;
  let fixture: ComponentFixture<MeasureMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
