import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  modalsService = inject(ModalsService)
  
}
