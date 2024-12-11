import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/configuration_service/settings.service';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatIcon, ClipboardModule, MatDialogModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  settingsService = inject(SettingsService)
  snackBar = inject(MatSnackBar);

  show_copy_colection_snackbar(){
    this.snackBar.open("Todos los datos copiados al portapapeles", "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
