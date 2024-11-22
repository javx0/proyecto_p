import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamComponent } from '../modals/create-team/create-team.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  dialog = inject(MatDialog);

  open_dialog_create_team(){
    this.dialog.open(CreateTeamComponent, {"maxHeight": "70vh", "maxWidth": "70vw"})
  }
}
