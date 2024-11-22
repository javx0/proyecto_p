import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TeamsService } from '../../services/teams.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatDialogModule],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent {

  teamsService = inject(TeamsService)

}
