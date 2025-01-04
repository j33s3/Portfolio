import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';

import { ContactComponent } from './contact/contact.component';

import { WorkPersonalComponent } from './work/work-personal/work-personal.component';
import { WorkSchoolComponent } from './work/work-school/work-school.component';
import { WorkWorkComponent } from './work/work-work/work-work.component';

import { WorkDetailsComponent } from './work/work-details/work-details.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },                // Default route

    { path: 'about', component: AboutComponent, runGuardsAndResolvers: 'always' },          // About page route

    { path: 'contact', component: ContactComponent},       // Contact page route

    { path: 'personal', component: WorkPersonalComponent },// Work Page routes
    { path: 'school', component: WorkSchoolComponent },
    { path: 'work', component: WorkWorkComponent },

    { path: 'details/:id', component: WorkDetailsComponent},

];