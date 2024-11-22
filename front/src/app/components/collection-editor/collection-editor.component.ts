import { Component, inject } from '@angular/core';
import { ColectionService } from '../../services/colection_service/colection.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './collection-editor.component.html',
  styleUrl: './collection-editor.component.css'
})
export class CollectionEditorComponent {

  colectionService = inject(ColectionService)
}
