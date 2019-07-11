import Register from './components/register/Register.vue';
import Home from './components/home/Home.vue';

export const routes = [
    { path: '', name: 'home',  component: Home, title: 'Home', isEnabledInMenu: true},
    { path: '/register', name: 'register', component: Register,title: 'Register', isEnabledInMenu: true},
    { path: '/register/:id', name: 'update', component: Register,title: 'Update', isEnabledInMenu: false},
    { path: '*',  component: Home, isEnabledInMenu: false }
];