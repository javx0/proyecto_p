import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColectionService {

  colections_avaliable:Colection[] = []

  id_colection_beign_modified = 0
  colection_beign_modified:Colection = {"name":"", "word_list":[], "is_selected": false}
  word:string = ""

  constructor(){
    this.load_colections_from_local_storage()
  }

  add_colection(){
    this.colections_avaliable.push({"name": "coleccion" + this.colections_avaliable.length, "word_list": [], "is_selected": false})
  }

  select_colection_to_modify(id:number){
    this.id_colection_beign_modified = id
    this.colection_beign_modified = {...this.colections_avaliable[id]}
  }

  add_word(){
    this.colection_beign_modified.word_list.push(this.word)
  }

  remove_word($index:number){
    this.colection_beign_modified.word_list.splice($index,1)
  }

  save_colection_modified(){
    this.colections_avaliable[this.id_colection_beign_modified] = this.colection_beign_modified
    this.save_colections_in_local_storage()
  }

  remove_colection_beign_modified(){
    this.colections_avaliable.splice(this.id_colection_beign_modified,1)
    this.save_colections_in_local_storage()
  }

  save_colections_in_local_storage(){
    localStorage.setItem("colections_avaliable", JSON.stringify(this.colections_avaliable))
  }

  load_colections_from_local_storage(){
    this.colections_avaliable = JSON.parse(localStorage.getItem("colections_avaliable") ?? "[]")
  }

  get_word_list_from_selected_colections(word_cuantity_to_get:number): string[]{
    let words_avaliable:string[] = []
    let words_selected:string[] = []

    this.colections_avaliable.forEach(colection => {
      if (colection.is_selected){
        words_avaliable = words_avaliable.concat(colection.word_list)
      }
    });

    for(let counter = 0; counter < word_cuantity_to_get; counter++){

      let random_index = Math.floor(Math.random() * words_avaliable.length);

      let word = words_avaliable[random_index]
      words_avaliable.splice(random_index,1);

      words_selected.push(word)
    }
    
    return words_selected
  }
}

interface Colection{
  "name": string,
  "word_list": string[],
  "is_selected": boolean
}
