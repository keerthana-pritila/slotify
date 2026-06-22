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
import { LogoutLoading } from './logout-loading/logout-loading';
import { Rewards } from './rewards/rewards';
import { AdminLogin } from './admin-login/admin-login';
import { Admin } from './admin/admin';
import { AdminUsers } from './admin-users/admin-users';
import { Venues } from './venues/venues';
import { AdminBooking } from './admin-booking/admin-booking';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'about', component: About },
    { path: 'bookSlot', component: BookSlot },
    { path: 'achievements', component: Achievements },
    { path: 'myBooking', component: MyBooking },
    { path: 'faq', component: Faq },
    { path: 'logoutLoading', component: LogoutLoading },
    { path: 'rewards', component: Rewards },
    { path: 'admin-login', component: AdminLogin },
    {
        path: 'admin', component: Admin,
        children: [
            { path: 'users', component: AdminUsers }, //child routes
            {path: 'venues', component: Venues},
            {path: 'bookings',component: AdminBooking}
        ]
    },


];
