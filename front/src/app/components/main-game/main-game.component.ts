import { Component, inject } from '@angular/core';
import { GameCoreService } from '../../services/game-core.service';

@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [],
  templateUrl: './main-game.component.html',
  styleUrl: './main-game.component.css'
})
export class MainGameComponent {

  gameCoreService = inject(GameCoreService)
}
