import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitanjeEditorComponent } from './pitanje-editor.component';

describe('PitanjeEditorComponent', () => {
  let component: PitanjeEditorComponent;
  let fixture: ComponentFixture<PitanjeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitanjeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PitanjeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
