import { inject, Injectable } from '@angular/core';
import { ColectionService } from './colection_service/colection.service';
import { TeamsService } from './teams.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GameCoreService {

  snackBar = inject(MatSnackBar);

  game_state = ""    //rules, teams, word, podium

  rules = [
    "describir la palabra",
    "una sola palabra",
    "mimica",
    "sin reglas definidas :(",
    "sin reglas definidas :("
  ]

  rounds:number = 3
  time_per_round:number = 10
  words_per_round:number = 5
  teams:Team[] = []
  words_avaliable:string[] = []

  active_word:string = "placeholder"
  active_team_index:number = 0

  current_round = 0

  colectionService = inject(ColectionService)
  teamService = inject(TeamsService)
  router = inject(Router)

  initialice_game(){
    try{
      this.teams = this.teamService.get_active_teams()

      if(this.teams.length < 2){
        throw "Se necesitan al menos 2 equipos para poder jugar"
      }

      this.words_avaliable = this.colectionService.get_word_list_from_selected_colections(this.teams.length * this.words_per_round)
      this.initialice_random_words_for_teams()
      
      this.router.navigate(["/play"])
      this.game_state = "rules"
    }
    catch(error){
      this.snackBar.open(String(error), "", {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        duration: 5000
      });
    }
  }

  //Herramientas

  order_teams_by_time_spent(){
    this.teams.sort((team1, team2) => {
      return team1.time_spent - team2.time_spent
    })
  }

  initialice_random_words_for_teams(){   //Dar lista de palabras aleatorias a todos los equipos
    let word_list = [...this.words_avaliable]

    this.teams.forEach(team => {
      team.word_list_active_round = []
      for(let counter = 0; counter < this.words_per_round; counter++){
        
        let word = this.get_random_word_from_list(word_list)

        team.word_list_active_round.push(word)
        word_list.splice(word_list.indexOf(word),1)
      }
      
    });
    this.active_team_index = 0
  }

  get_next_avaliable_team_index(){

    let current_team_trying_index = this.active_team_index + 1

    for(let i=0; this.teams.length > i; i++){
      console.log("buscando equipo");
      
      if(current_team_trying_index > this.teams.length -1){
        current_team_trying_index = 0
      }

      if(this.teams[current_team_trying_index].word_list_active_round.length > 0){
        return current_team_trying_index
      }
    }

    return -1
  }

  get_next_word(){
    this.remove_word_from_active_team()

    let active_team = this.teams[this.active_team_index]
    let active_team_word_list = active_team.word_list_active_round

    if(active_team_word_list.length){
      this.get_random_word_from_active_team()
    }else{
      this.stop_timer()
      active_team.time_spent = active_team.time_spent + this.time

      let next_team_index = this.get_next_avaliable_team_index()
      if(next_team_index != -1){
        this.active_team_index = next_team_index
        this.game_state = "teams"

      }else{
        this.current_round = this.current_round + 1

        if (this.current_round < this.rounds){
          this.game_state = "rules"
        }else{
          this.order_teams_by_time_spent()
          this.game_state = "podium"
        }

      }
    }
  }

  
  get_random_word_from_list(word_list:string[]){
    let random_index = Math.floor(Math.random() * word_list.length);
    
    return word_list[random_index]
  }
  
  remove_word_from_active_team(){
    let active_team = this.teams[this.active_team_index]
    let active_team_word_list = active_team.word_list_active_round
    
    active_team_word_list.splice(active_team_word_list.indexOf(this.active_word),1)
  }

  get_random_word_from_active_team(){
    let active_team = this.teams[this.active_team_index]
    let active_team_word_list = active_team.word_list_active_round

    this.active_word = this.get_random_word_from_list(active_team_word_list)
  }


  // FUNCIONES CAMBIOS DE FASE

  change_phase_rules_to_teams(){
    this.active_team_index = 0
    this.game_state = "teams"
    this.initialice_random_words_for_teams()
    console.log("cambiando de reglas a teams");
    
  }
  
  change_phase_teams_to_words(){
    this.get_random_word_from_active_team()
    this.game_state = "words"
    this.start_timer()
    console.log("cambiando de teams a words");
    
  }

  // FUNCIONES PARA EL TIMER_____________________________________________________________________________________
  time: number = 0;        // Tiempo en segundos
  interval: any;            // Variable para almacenar la referencia del setInterval

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start_timer(): void {
    this.time = 0
    this.interval = setInterval(() => {
      this.time++;
      if(this.time >= this.time_per_round){
        this.stop_timer()
        console.log("a");
        
        this.teams[this.active_team_index].time_spent = this.teams[this.active_team_index].time_spent + this.time_per_round
        this.active_team_index = this.get_next_avaliable_team_index()

        this.game_state = "teams"
      }
    }, 1000);
  }

  stop_timer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  reset_timer(): void {
    this.time = 0;
    this.stop_timer();
    this.start_timer();
  }

}

interface Team{
  "name": string,
  "word_list_active_round": string[],
  "time_spent":number
}