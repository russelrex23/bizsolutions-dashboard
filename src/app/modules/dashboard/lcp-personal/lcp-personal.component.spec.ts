import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcpPersonalComponent } from './lcp-personal.component';

describe('LcpPersonalComponent', () => {
  let component: LcpPersonalComponent;
  let fixture: ComponentFixture<LcpPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcpPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LcpPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
