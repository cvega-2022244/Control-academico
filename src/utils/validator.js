import { hash, compare } from 'bcrypt'

// Encriptar la contraseña
export const encryptPassword = async (password) => {
    try {
        return await hash(password, 10)
    } catch (err) {
        console.error(err)
        throw new Error('Error al encriptar la contraseña')
    }
}

// Validar la contraseña
export const checkPassword = async (password, hashedPassword) => {
    try {
        return await compare(password, hashedPassword)
    } catch (err) {
        console.error(err)
        throw new Error('Error al validar la contraseña')
    }
}

// Validar la actualización de datos del usuario o curso
export const checkUpdate = (data, userId) => {
    if (userId) {
        if (
            Object.entries(data).length === 0 ||
            data.password !== undefined ||
            data.role !== undefined
        ) {
            return false
        }
        return true
    } else {
        if (Object.entries(data).length === 0 || data.keeper !== undefined) {
            return false
        }
        return true
    }
}
