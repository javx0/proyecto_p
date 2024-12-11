import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamComponent } from '../modals/create-team/create-team.component';
import { TeamsService } from './teams.service';
import { UploadColectionWordsComponent } from '../modals/upload-colection-words/upload-colection-words.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { SettingsService } from './configuration_service/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  dialog = inject(MatDialog);
  teamsService = inject(TeamsService)
  settingsService = inject(SettingsService)

  constructor(){
  }

  open_dialog_create_team(){
    let create_team_dialog = this.dialog.open(CreateTeamComponent, {"maxHeight": "70vh", "maxWidth": "70vw"})
    create_team_dialog.afterClosed().subscribe((response) => {
      this.teamsService.save_teams_to_local_storage()
    })
  }

  open_upload_colection_words(){
    this.dialog.open(UploadColectionWordsComponent, {"maxHeight": "70vh", "maxWidth": "70vw"})
  }
  
  open_settings(){
    let settings_dialog = this.dialog.open(SettingsComponent, {"maxHeight": "70vh", "maxWidth": "70vw"})
    settings_dialog.afterClosed().subscribe((response) => {
      this.settingsService.save_default_setting()
      this.settingsService.apply_default_settings()
    })
  }
}
