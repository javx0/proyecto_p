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

  constructor(){
    this.load_teams_from_local_storage()
  }

  add_team(){
    this.teams_avaliable.push({"name": "equipo" + this.teams_avaliable.length, "is_selected": false})
    this.save_teams_to_local_storage()
  }

  select_team_to_modify(id:number){
    this.id_team_beign_modified = id
    this.team_beign_modified = this.teams_avaliable[id]
  }

  delete_team_beign_modified(){
    this.teams_avaliable.splice(this.id_team_beign_modified, 1)
    this.save_teams_to_local_storage()
  }

  save_teams_to_local_storage(){
    localStorage.setItem("teams", JSON.stringify(this.teams_avaliable))
  }

  load_teams_from_local_storage(){
    let teams_to_load = localStorage.getItem("teams")

    if (teams_to_load){
      let teams_loaded = JSON.parse(teams_to_load)
      teams_loaded.forEach((team:any) => {
          team.is_selected = false
      });
      this.teams_avaliable = teams_loaded
    }
  }

  get_active_teams(){
    let team_list:any[] = []

    this.teams_avaliable.forEach(team => {
      if (team.is_selected){
        let team_to_add = {"name": "","word_list_active_round": [] ,"time_spent": 0}
        team_to_add.name = team.name
        team_list.push(team_to_add)
      }
    });

    return team_list
  }

}
