import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Home from './Home.vue';
import Dashboard from './components/Dashboard.vue';
import Settings from './components/Settings.vue';
import CreateListing from './components/CreateListing.vue';

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/createlisting', name: 'CreateListing', component: CreateListing }
]
