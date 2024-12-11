import { inject, Injectable } from '@angular/core';
import { GameCoreService } from '../game-core.service';
import { TeamsService } from '../teams.service';
import { ColectionService } from '../colection_service/colection.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  gameCoreService = inject(GameCoreService)
  teamsService = inject(TeamsService)
  colectionService = inject(ColectionService)

  snackBar = inject(MatSnackBar);

  default_settings:Settings = {
    default_rules: [
      "describir la palabra",
      "una sola palabra",
      "mimica",
      "sin reglas definidas :(",
      "sin reglas definidas :("
    ],
  
    default_rounds: 3,
    default_time_per_round: 60,
    default_words_per_round: 10
  }

  all_data = ""
  

  constructor(){
    this.load_default_settings()
    this.apply_default_settings()
  }

  load_default_settings(){
    let default_settings = localStorage.getItem("default_settings")
    if(default_settings){
      let loaded_settings = JSON.parse(default_settings)
      this.default_settings = loaded_settings
    }else{
      this.default_settings = {
        default_rules: [
          "describir la palabra",
          "una sola palabra",
          "mimica",
          "sin reglas definidas :(",
          "sin reglas definidas :("
        ],
      
        default_rounds: 3,
        default_time_per_round: 60,
        default_words_per_round: 10
      }
      this.save_default_setting()
    }
  }

  save_default_setting(){
    localStorage.setItem("default_settings", JSON.stringify(this.default_settings))
  }

  apply_default_settings(){
    this.gameCoreService.rounds = this.default_settings.default_rounds
    this.gameCoreService.rules = this.default_settings.default_rules
    this.gameCoreService.time_per_round = this.default_settings.default_time_per_round
    this.gameCoreService.words_per_round = this.default_settings.default_words_per_round
  }

  export_all_data(){
    this.teamsService.load_teams_from_local_storage()
    this.colectionService.load_colections_from_local_storage()

    let all_data = {
      "settings": this.default_settings ?? null,
      "teams": this.teamsService.teams_avaliable ?? null,
      "colections": this.colectionService.colections_avaliable ?? null
    }
    return JSON.stringify(all_data)
  }

  import_all_data(){
    try{
      let all_data = JSON.parse(this.all_data)

      if(all_data["settings"]){
        this.default_settings = all_data["settings"]
        this.save_default_setting()
      }

      if(all_data["teams"]){
        this.teamsService.teams_avaliable = all_data["teams"]
        this.teamsService.save_teams_to_local_storage()
      }

      if(all_data["colections"]){
        this.colectionService.colections_avaliable = all_data["colections"]
        this.colectionService.save_colections_in_local_storage()
      }

      this.snackBar.open("Datos importados correctamente, disfruta del juego", "", {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        duration: 5000
      });

    }catch(error){
      this.snackBar.open("Error al procesar el texto de entrada comprueba que el texto sea un formato json valido (pregunta a javi)", "", {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        duration: 5000
      });
    }
  }
}

interface Settings{
  default_rules: string[],

  default_rounds: number,
  default_time_per_round: number,
  default_words_per_round: number
}