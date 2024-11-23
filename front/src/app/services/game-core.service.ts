import { inject, Injectable } from '@angular/core';
import { ColectionService } from './colection_service/colection.service';
import { TeamsService } from './teams.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameCoreService {

  rounds:number = 3
  time_per_round:number = 60
  words_per_round:number = 5
  teams:Team[] = []
  words_avaliable:string[] = []

  active_word:string = "placeholder"
  active_team_index:number = 0
  game_state:string = ""    //playing, stopped

  colectionService = inject(ColectionService)
  teamService = inject(TeamsService)
  router = inject(Router)

  initialice_game(){
    this.teams = this.teamService.get_active_teams()
    this.words_avaliable = this.colectionService.get_word_list_from_selected_colections(this.teams.length * this.words_per_round)
    this.initialice_round()

    this.start_timer()
    
    this.router.navigate(["/play"])
  }

  initialice_round(){

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


  delete_active_word_and_get_next_word(){
    let active_team = this.teams[this.active_team_index]
    active_team.word_list_active_round.splice(active_team.word_list_active_round.indexOf(this.active_word),1)

    if(active_team.word_list_active_round.length){
      this.next_word()
    }else{
      this.stop_timer()
      active_team.time_spent = this.time
    }
  }

  next_word(){
    let word_list = this.teams[this.active_team_index].word_list_active_round
    this.active_word = this.get_random_word_from_list(word_list)
    
  }

  get_random_word_from_list(word_list:string[]){
    let random_index = Math.floor(Math.random() * word_list.length);
    
    return word_list[random_index]
  }



  time: number = 0;        // Tiempo en segundos
  interval: any;            // Variable para almacenar la referencia del setInterval

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start_timer(): void {
    this.interval = setInterval(() => {
      this.time++;
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