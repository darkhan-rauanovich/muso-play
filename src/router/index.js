import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylist from "../views/playlists/UserPlaylist.vue";

import { auth } from "@/firebase";

// auth guard
const requiredAuth = (to, from, next) => {
  let user = auth.currentUser;
  // console.log("current user in auth guard: ", user);
  if (!user) {
    next({ name: "login" });
  } else {
    next();
  }
};

const requiredNoAuth = (to, from, next) => {
  let user = auth.currentUser;
  // console.log("current user in auth guard: ", user);
  if (user) {
    next({ name: "home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: requiredNoAuth,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    beforeEnter: requiredNoAuth,
  },
  {
    path: "/playlists/create",
    name: "create-playlist",
    component: CreatePlaylist,
    beforeEnter: requiredAuth,
  },
  {
    path: "/playlists/:id",
    name: "playlist-details",
    component: PlaylistDetails,
    props: true,
  },
  {
    path: "/playlists/user",
    name: "user-playlists",
    component: UserPlaylist,
    beforeEnter: requiredAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
