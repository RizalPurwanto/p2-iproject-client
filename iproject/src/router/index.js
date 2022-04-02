import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue"
import Dnb from "../views/Dnb"
import DriverLicence from "../views/DriverLicence"
import Aec from "../views/Aec"
import Visa from "../views/Visa"
import Verified from "../views/Verified"
import CustomerService from "../views/CustomerService"
import VerificationAUS from "../views/VerificationAUS"
import RegisterINA from "../views/RegisterINA"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/verification-au",
    name: "VerificationAUS",
    component: VerificationAUS,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/register-id",
    name: "RegisterINA",
    component: RegisterINA,
  },
  {
    path: "/driverlicence/:id",
    name: "DriverLicence",
    component: DriverLicence,
  },
  {
    path: "/dnb",
    name: "Dnb",
    component: Dnb,
  },
  {
    path: "/aec",
    name: "Aec",
    component: Aec,
  },
  {
    path: "/visa",
    name: "Visa",
    component: Visa,
  },
  {
    path: "/verified",
    name: "Verified",
    component: Verified,
  },
  {
    path: "/customerservice",
    name: "CustomerService",
    component: CustomerService,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next)=>{
  
  if((to.name == "Home" || to.name == "Register" || to.name == "RegisterINA") && localStorage.verificationId) {
    next("/verification-au")
  }  else if ((to.name !== "Home" && to.name !== "Register" && to.name !== "RegisterINA") && !localStorage.verificationId && !localStorage.idIna){
    next("/")
  }  else {
    next()
  }

  
})


export default router;
