import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamComponent } from '../modals/create-team/create-team.component';
import { TeamsService } from './teams.service';
import { UploadColectionWordsComponent } from '../modals/upload-colection-words/upload-colection-words.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  dialog = inject(MatDialog);
  teamsService = inject(TeamsService)

  open_dialog_create_team(){
    let create_team_dialog = this.dialog.open(CreateTeamComponent, {"maxHeight": "70vh", "maxWidth": "70vw"})
    create_team_dialog.afterClosed().subscribe((response) => {
      this.teamsService.save_teams_to_local_storage()
    })
  }

  open_upload_colection_words(){
    this.dialog.open(UploadColectionWordsComponent, {"maxHeight": "70vh", "maxWidth": "70vw"})
  }
}
