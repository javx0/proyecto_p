import { Component, inject } from '@angular/core';
import { ColectionService } from '../../services/colection_service/colection.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ModalsService } from '../../services/modals.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collection-editor',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterModule, ClipboardModule],
  templateUrl: './collection-editor.component.html',
  styleUrl: './collection-editor.component.css'
})
export class CollectionEditorComponent {

  colectionService = inject(ColectionService)
  modalService = inject(ModalsService)

  snackBar = inject(MatSnackBar);

  show_copy_colection_snackbar(){
    this.snackBar.open('Palabras de la colección copiadas al portapapeles', "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
