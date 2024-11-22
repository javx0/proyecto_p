import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams_avaliable = [
    {"name": "equipo1", "is_selected": true},
    {"name": "equipo2", "is_selected": false},
    {"name": "equipo3", "is_selected": true},
    {"name": "equipo4", "is_selected": false},
    {"name": "equipo1", "is_selected": true},
  ]

  id_team_beign_modified = 0
  team_beign_modified = {"name":""}

  add_team(){
    this.teams_avaliable.push({"name": "equipo" + this.teams_avaliable.length, "is_selected": false})
  }

  select_team_to_modify(id:number){
    this.id_team_beign_modified = id
    this.team_beign_modified = this.teams_avaliable[id]
  }

  delete_team_beign_modified(){
    this.teams_avaliable.splice(this.id_team_beign_modified, 1)
  }


}
