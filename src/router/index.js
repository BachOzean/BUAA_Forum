import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Content from '../views/Content.vue'
import Community from '../views/Community.vue'
import Message from '../views/Message.vue'
import Publish from '../views/Publish.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import UserInfor from "@/views/UserInfor.vue";
import UserChange from "@/views/UserChange.vue";
import CommunityPage from "@/views/CommunityPage.vue";
import MyPosts from "@/views/MyPosts.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
    {
        path: '/post/:id',
        name: 'Content',
        component: Content,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/community/:id',
        name: 'Community',
        component: Community
    },
    {
        path: '/message',
        name: 'Message',
        component: Message
    },
    {
        path: '/publish',
        name: 'Publish',
        component: Publish,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/signup',
        name: "SignUp",
        component: SignUp
    },
    {
        path: '/userinfor',
        name: "UserInfor",
        component: UserInfor,
    },
    {
        path: '/userchange',
        name: "UserChange",
        component: UserChange,
    },
    {
        path: '/communities/',
        name: 'CommunityPage',
        component: CommunityPage
    },
    {
        path: '/myposts/',
        name: 'MyPosts',
        component: MyPosts,
        meta: {
            requireAuth: true
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router