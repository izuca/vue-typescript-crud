import { ref } from "vue"
import type { IUser } from "@/services/api"
import { useRouter } from "vue-router"
import { sleep } from "@/helpers/promise"

const user = ref<IUser | null>(null)

export const useUser = () => {
	const router = useRouter()

	const setUser = (payload: IUser) => {
		user.value = payload
	}

	const login = async (accessToken: string) => {
		localStorage.setItem("accessToken", accessToken)
		await sleep(500)
		await router.push({
			name: "dashboard",
		})
	}

	const logout = async () => {
		user.value = null

		localStorage.removeItem("accessToken")
		await sleep(200)
		await router.push("login")
	}

	return { user, setUser, logout, login }
}
