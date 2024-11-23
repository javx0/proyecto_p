import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule
import { GameCoreService } from '../../services/game-core.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ModalsService } from '../../services/modals.service';
import { TeamsService } from '../../services/teams.service';
import { ColectionService } from '../../services/colection_service/colection.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.css'
})
export class GameMenuComponent {

  gameCoreService = inject(GameCoreService)
  teamsService = inject(TeamsService)
  modalService = inject(ModalsService)
  colectionService = inject(ColectionService)
  router = inject(Router)

  private holdTimeout: any;

  onMouseDownTeams($index:number) {
    this.holdTimeout = setTimeout(() => {
      this.onHoldTeams($index);
    }, 1000);
  }
  
  onHoldTeams($index:number) {
    this.modalService.open_dialog_create_team()
    this.teamsService.select_team_to_modify($index)
  }
  
  
  onMouseDownColections($index:number) {
    this.holdTimeout = setTimeout(() => {
      this.onHoldColections($index);
    }, 1000);
  }
  
  onHoldColections($index:number) {
    this.router.navigate(['/colection_editor'])
    this.colectionService.select_colection_to_modify($index)
  }
  
  onMouseUp() {
    clearTimeout(this.holdTimeout);
  }
}
