import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadColectionWordsComponent } from './upload-colection-words.component';

describe('UploadColectionWordsComponent', () => {
  let component: UploadColectionWordsComponent;
  let fixture: ComponentFixture<UploadColectionWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadColectionWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadColectionWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
