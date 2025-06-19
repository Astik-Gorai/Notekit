import { Routes } from '@angular/router';
import { SignUpComponent } from './Home/sign-up/sign-up.component';
import { LoginComponent } from './Home/login/login.component';
import { HeroSectionComponent } from './Home/hero-section/hero-section.component';
import { MyNotesComponent } from './Features/my-notes/my-notes.component';
import { MyEditorComponent } from './Features/my-editor/my-editor.component';
import { MySpaceComponent } from './Features/my-space/my-space.component';
import { NotePreviewComponent } from './Features/note-preview/note-preview.component';
import { MyProfileComponent } from './Home/my-profile/my-profile.component';
import { authServiceGuard } from './auth-service.guard';
import { LogoutComponent } from './Home/logout/logout.component';
import { ExploreComponent } from './Home/explore/explore.component';
import { SharedNoteComponent } from './Home/shared-note/shared-note.component';
import { LandingPageComponent } from './Home/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path:'home',
        component:LandingPageComponent
    },
    {
        path:'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'my-space',
        canActivate: [authServiceGuard],
        component: MySpaceComponent
    },
    {
        path: 'my-editor',
        canActivate: [authServiceGuard],
        component: MyEditorComponent
    },
    {
        path: 'note-preview',
        canActivate: [authServiceGuard],
        component: NotePreviewComponent
    },
    {
        path: 'my-profile',
        canActivate: [authServiceGuard],
        component:MyProfileComponent
    },{
        path:'logout',
        component:LogoutComponent
    },{
        path: 'my-explorer',
        component: SharedNoteComponent
    }
];
