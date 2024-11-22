import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEditorComponent } from './collection-editor.component';

describe('CollectionEditorComponent', () => {
  let component: CollectionEditorComponent;
  let fixture: ComponentFixture<CollectionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
