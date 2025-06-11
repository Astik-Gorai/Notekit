import { Routes } from '@angular/router';
import { SignUpComponent } from './Home/sign-up/sign-up.component';
import { LoginComponent } from './Home/login/login.component';
import { HeroSectionComponent } from './Home/hero-section/hero-section.component';
import { MyNotesComponent } from './Features/my-notes/my-notes.component';
import { MyEditorComponent } from './Features/my-editor/my-editor.component';
import { MySpaceComponent } from './Features/my-space/my-space.component';
import { NotePreviewComponent } from './Features/note-preview/note-preview.component';

export const routes: Routes = [
    {
        path:'home',
        component:HeroSectionComponent
    },
    {
        path:'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: MySpaceComponent
    },
    {
        path:'my-notes',
        component: MyNotesComponent
    },
    {
        path: 'my-editor',
        component: MyEditorComponent
    },
    {
        path: 'note-preview',
        component: NotePreviewComponent
    }
];
