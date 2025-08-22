import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';

import { ContactComponent } from './contact/contact.component';

import { WorkPersonalComponent } from './work/work-personal/work-personal.component';
import { WorkSchoolComponent } from './work/work-school/work-school.component';
import { WorkWorkComponent } from './work/work-work/work-work.component';

import { DSADetailsComponent } from './work/work-details/DSA/work-details.component';
import { IMSDetailsComponent } from './work/work-details/IMS/work-details.component';
import { TruckingDBDetailsComponent } from './work/work-details/TruckingDB/work-details.component';
import { PortfolioDetailsComponent } from './work/work-details/Portfolio/work-details.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },                // Default route

    { path: 'about', component: AboutComponent, runGuardsAndResolvers: 'always' },          // About page route

    { path: 'contact', component: ContactComponent},       // Contact page route

    { path: 'personal', component: WorkPersonalComponent },// Work Page routes
    { path: 'school', component: WorkSchoolComponent },
    { path: 'professional', component: WorkWorkComponent },

    { path: 'details/DSA', component: DSADetailsComponent},
    { path: 'details/IMS', component: IMSDetailsComponent},
    { path: 'details/TruckingDB', component: TruckingDBDetailsComponent},
    { path: 'details/Portfolio', component: PortfolioDetailsComponent},

];
