import axios from "axios"

export interface IUser {
	name: string
	email: string
	isAdmin: boolean
	createdAt: string
}

export interface IStudent {
	id: string
	ra: number
	name: string
	email: string
	cpf: string
	createdAt: Date
	updatedAt: Date
}

export interface ICreateStudentBody {
	ra: number
	name: string
	email: string
	cpf: string
}

const client = axios.create({
	baseURL: "http://localhost:3000/api/v1",
})

client.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem("accessToken")

		if (accessToken) {
			config.headers = {
				...config.headers,
				authorization: `Bearer ${accessToken}`,
			}
		}

		return config
	},
	error => Promise.reject(error),
)

const defaultErrorMessage = "Internal Server Error"

export default {
	login: async (body: { email: string; password: string }) => {
		try {
			const { data } = await client.post("/login", body)
			return data
		} catch (error: any) {
			if (error.response?.status === 401)
				throw new Error("Email or password is invalid.")
			throw new Error(defaultErrorMessage)
		}
	},

	me: async (): Promise<{ me: IUser }> => {
		const { data } = await client.get("/me")
		return data
	},

	listStudents: async (params?: {
		q?: string
		skip?: number
		length?: number
	}): Promise<{
		students: IStudent[]
		count: number
	}> => {
		const { data } = await client.get("/students", { params })
		return data
	},

	findOneStudent: async (
		studentId: string,
	): Promise<{
		student: IStudent
	}> => {
		const { data } = await client.get(`/students/${studentId}`)
		return data
	},

	createStudent: async (body: ICreateStudentBody): Promise<void> => {
		try {
			await client.post("/students/", body)
		} catch (error: any) {
			if (error.response?.data) throw new Error(error.response?.data)
			throw new Error(defaultErrorMessage)
		}
	},

	updateStudent: (
		studentId: string,
		body: { name: string; email: string },
	) => {
		try {
			return client.put(`/students/${studentId}`, body)
		} catch (error: any) {
			if (error.response?.data) throw new Error(error.response?.data)
			throw new Error(defaultErrorMessage)
		}
	},

	deleteStudent: (
		studentId: string,
	): Promise<{
		students: IStudent[]
		count: number
	}> => client.delete(`/students/${studentId}`),
}
