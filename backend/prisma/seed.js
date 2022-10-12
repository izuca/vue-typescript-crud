/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client")
const bcryptjs = require("bcryptjs")

const prisma = new PrismaClient()

const userData = [
	{
		name: "Pedro",
		email: "pedro@donnes.com.br",
		isAdmin: true,
	},
	{
		name: "Renata",
		email: "renata@donnes.com.br",
		isAdmin: true,
	},
	{
		name: "Jesse Kalil",
		email: "jessekalilms@outlook.com",
		isAdmin: true,
	},
]

async function main() {
	const passwordHash = await bcryptjs.hash("12345678", 8)

	console.log(`Start seeding ...`)
	for (const u of userData) {
		const user = await prisma.user.create({
			data: { ...u, password: passwordHash },
		})
		console.log(`Created user with id: ${user.id}`)
	}
	console.log(`Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
