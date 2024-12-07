import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ColectionService } from '../../services/colection_service/colection.service';

@Component({
  selector: 'app-upload-colection-words',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatDialogModule],
  templateUrl: './upload-colection-words.component.html',
  styleUrl: './upload-colection-words.component.css'
})
export class UploadColectionWordsComponent {
  colectionService = inject(ColectionService)
}
