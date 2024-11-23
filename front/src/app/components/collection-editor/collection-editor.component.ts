import { Component, inject } from '@angular/core';
import { ColectionService } from '../../services/colection_service/colection.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collection-editor',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterModule],
  templateUrl: './collection-editor.component.html',
  styleUrl: './collection-editor.component.css'
})
export class CollectionEditorComponent {

  colectionService = inject(ColectionService)
}
