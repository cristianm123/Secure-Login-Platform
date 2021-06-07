import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesLineGraphComponent } from './prices-line-graph.component';

describe('ActiveLineGraphComponent', () => {
  let component: PricesLineGraphComponent;
  let fixture: ComponentFixture<PricesLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricesLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricesLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
