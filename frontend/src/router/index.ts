import { createRouter, createWebHistory } from "vue-router"
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout.vue"
import Login from "@/views/Login.vue"
import Home from "@/views/Home.vue"
import Students from "@/views/dashboard/Students.vue"

const dashboardBeforeEnter = () => {
	const accessToken = localStorage.getItem("accessToken")
	return accessToken ? true : { name: "login" }
}

const loginBeforeEnter = () => {
	const accessToken = localStorage.getItem("accessToken")
	return accessToken ? { name: "dashboard" } : true
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
			redirect: "login",
		},
		{
			path: "/login",
			name: "login",
			beforeEnter: loginBeforeEnter,
			component: Login,
		},
		{
			path: "/",
			name: "dashboard",
			beforeEnter: dashboardBeforeEnter,
			component: DashboardLayout,
			redirect: "students",
			children: [
				{
					path: "/students",
					name: "students",
					component: Students,
				},
			],
		},
	],
})

export default router
