import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorijaEditorComponent } from './kategorija-editor.component';

describe('KategorijaEditorComponent', () => {
  let component: KategorijaEditorComponent;
  let fixture: ComponentFixture<KategorijaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategorijaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorijaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
