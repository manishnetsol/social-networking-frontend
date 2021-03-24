import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlysidebarComponent } from './onlysidebar.component';

describe('OnlysidebarComponent', () => {
  let component: OnlysidebarComponent;
  let fixture: ComponentFixture<OnlysidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlysidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlysidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
