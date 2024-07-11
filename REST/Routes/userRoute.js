import express,{Router} from 'express'
import { registration,login, deleteuser, updateUser} from '../Controllers/Users/users.js'
import { authendicate } from '../Utils/autentication.js'
import { validatePayload } from '../Utils/common.js'
import { userValidationSchema } from '../Schemas/user_schema.js'

const userRoute = Router()

userRoute.delete('/delete-user', authendicate, deleteuser)
userRoute.put('/updateuser', authendicate, updateUser)
userRoute.post("/registration",validatePayload(userValidationSchema),registration)
userRoute.post("/login", login)

export default userRoute