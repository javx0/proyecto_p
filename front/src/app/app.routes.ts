import { Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GameMenuComponent } from './components/game-menu/game-menu.component';
import { CollectionEditorComponent } from './components/collection-editor/collection-editor.component';

export const routes: Routes = [
    { path: '', component: MainMenuComponent },          // Ruta por defecto
    { path: 'game_configuration', component: GameMenuComponent },    // Ruta '/about'
    { path: 'colection_editor', component: CollectionEditorComponent } 
];
