import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColectionService {

  colections_avaliable = [
    {"name": "equipo1", "word_list":[], "is_selected": true},
    {"name": "equipo2", "word_list":[], "is_selected": false},
    {"name": "equipo3", "word_list":[], "is_selected": true},
    {"name": "equipo4", "word_list":[], "is_selected": false},
    {"name": "equipo1", "word_list":[], "is_selected": true},
  ]

  id_colection_beign_modified = 0
  colection_beign_modified = {"name":"", "word_list":["palabra1", "palabra1", "palabra1", "palabra1", "palabra1", "palabra1"], "is_selected": false}
  word:string = ""


  add_colection(){
    this.colections_avaliable.push({"name": "coleccion" + this.colections_avaliable.length, "word_list": [], "is_selected": false})
  }

  select_colection_to_modify(id:number){
    this.id_colection_beign_modified = id
    this.colection_beign_modified = this.colections_avaliable[id]
  }

  add_word(){
    this.colection_beign_modified.word_list.push(this.word)
  }

  remove_word($index:number){
    this.colection_beign_modified.word_list.splice($index,1)
  }

}
