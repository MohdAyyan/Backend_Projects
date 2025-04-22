import {PrismaClient} from "../generated/prisma/index.js"

const prisma = new PrismaClient({
    log: ["query"],
    errorFormat: "pretty",
})


export default prisma