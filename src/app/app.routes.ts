import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';
import { BookSlot } from './book-slot/book-slot';
import { Achievements } from './achievements/achievements';
import { MyBooking } from './my-booking/my-booking';
import { Faq } from './faq/faq';
import {LogoutLoading } from './logout-loading/logout-loading';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'about', component: About },
    { path: 'bookSlot', component: BookSlot },
    { path: 'achievements', component: Achievements },
    { path: 'myBooking', component: MyBooking },
    {path: 'faq', component: Faq},
    {path: 'logoutLoading', component: LogoutLoading}
    
];
