import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPitanjaComponent } from './set-pitanja.component';

describe('SetPitanjaComponent', () => {
  let component: SetPitanjaComponent;
  let fixture: ComponentFixture<SetPitanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPitanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPitanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
