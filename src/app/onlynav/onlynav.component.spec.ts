import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlynavComponent } from './onlynav.component';

describe('OnlynavComponent', () => {
  let component: OnlynavComponent;
  let fixture: ComponentFixture<OnlynavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlynavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlynavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
