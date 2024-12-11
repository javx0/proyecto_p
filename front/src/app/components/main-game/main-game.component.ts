import { Component, inject } from '@angular/core';
import { GameCoreService } from '../../services/game-core.service';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [MatIcon, RouterModule],
  templateUrl: './main-game.component.html',
  styleUrl: './main-game.component.css'
})
export class MainGameComponent {

  gameCoreService = inject(GameCoreService)
  private holdTimeout: any;

  onMouseDownRules() {
    this.holdTimeout = setTimeout(() => {
      this.onHoldRules();
    }, 1000);
  }
  
  onHoldRules() {
    
    this.onMouseUp()
    this.gameCoreService.change_phase_rules_to_teams()
  }
  
  onMouseDownTeams() {
    this.holdTimeout = setTimeout(() => {
      this.onHoldTeams();
    }, 1000);
  }
  
  onHoldTeams() {
    this.onMouseUp()
    this.gameCoreService.change_phase_teams_to_words()
  }
  
  onMouseUp() {
    clearTimeout(this.holdTimeout);
  }
}
