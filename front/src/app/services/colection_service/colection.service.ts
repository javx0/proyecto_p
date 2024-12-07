import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColectionService {

  snackBar = inject(MatSnackBar);

  colections_avaliable:Colection[] = []

  id_colection_beign_modified = 0
  colection_beign_modified:Colection = {name:"", word_list:[], is_selected: false}
  colection_beign_modified_copy:Colection = {name: '', word_list: [], is_selected: false}
  word:string = ""

  words_to_append_to_active_colection:string = ""

  constructor(){
    this.load_colections_from_local_storage()
  }

  undo_active_colection_changes(){
    this.colections_avaliable[this.id_colection_beign_modified] = JSON.parse(JSON.stringify(this.colection_beign_modified_copy))
    this.colection_beign_modified = this.colections_avaliable[this.id_colection_beign_modified]
  }

  append_words_active_collection(){
    try{
      let list_words_to_append_to_active_colection = JSON.parse(this.words_to_append_to_active_colection)
      
      let active_colection_word = [...this.colection_beign_modified.word_list]
      let final_word_list = active_colection_word.concat(list_words_to_append_to_active_colection)
      
      final_word_list = this.sanitize_colection_word_list(final_word_list)
      this.colection_beign_modified.word_list = final_word_list
    }catch{

      this.snackBar.open('Error al añadir las nuevas palabras a la colección', "", {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        duration: 5000
      });
    }
  }

  get_active_colection_words(){
    let word_list = this.colection_beign_modified.word_list ?? []
    return <string[]> <unknown> JSON.stringify(word_list)
  }

  sanitize_colection_word_list(word_list:string[]){
    try{
      let sanitized_list = [...new Set(word_list)]
      return sanitized_list
    }catch{
      return word_list
    }
  }

  add_colection(){
    this.colections_avaliable.push({"name": "coleccion" + this.colections_avaliable.length, "word_list": [], "is_selected": false})
  }

  select_colection_to_modify(id:number){
    this.id_colection_beign_modified = id
    this.colection_beign_modified = this.colections_avaliable[id]

    this.colection_beign_modified_copy = JSON.parse(JSON.stringify(this.colection_beign_modified))
  }

  add_word(){
    this.colection_beign_modified.word_list.push(this.word)
    this.word = "" 
  }

  remove_word($index:number){
    this.colection_beign_modified.word_list.splice($index,1)
  }

  remove_colection_beign_modified(){
    this.colections_avaliable.splice(this.id_colection_beign_modified,1)
    this.save_colections_in_local_storage()
  }

  save_colections_in_local_storage(){

    this.colections_avaliable.forEach(colection => {
      colection.word_list = this.sanitize_colection_word_list(colection.word_list)
    });

    localStorage.setItem("colections_avaliable", JSON.stringify(this.colections_avaliable))
  }

  load_colections_from_local_storage(){
    this.colections_avaliable = JSON.parse(localStorage.getItem("colections_avaliable") ?? "[]")
    
    this.colections_avaliable.forEach(colection => {
      colection.word_list = this.sanitize_colection_word_list(colection.word_list)
      colection.is_selected = false
    });
  }

  get_word_list_from_selected_colections(word_cuantity_to_get:number): string[]{
    let words_avaliable:string[] = []
    let words_selected:string[] = []

    this.colections_avaliable.forEach(colection => {
      if (colection.is_selected){
        words_avaliable = words_avaliable.concat(colection.word_list)
      }
    });

    words_avaliable = this.sanitize_colection_word_list(words_avaliable)
    if(word_cuantity_to_get > words_avaliable.length){
      throw `No hay palabras suficientes en las colecciones seleccionadas para poder jugar, palabras: ${words_avaliable.length}/${word_cuantity_to_get}`
    }else{
      for(let counter = 0; counter < word_cuantity_to_get; counter++){

        let random_index = Math.floor(Math.random() * words_avaliable.length);
  
        let word = words_avaliable[random_index]
        words_avaliable.splice(random_index,1);
  
        words_selected.push(word)
      }
      
      return words_selected
    }
  }
}

interface Colection{
  "name": string,
  "word_list": string[],
  "is_selected": boolean
}
