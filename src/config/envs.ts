import * as joi from 'joi'
import * as dotenv from 'dotenv';

dotenv.config();

interface EnvsVars {
    PORT: number,
    JWT_SECRET: string
    DATABASE_URL: string,

}

const envSchema = joi.object<EnvsVars>({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),

}).unknown(true)

const { error, value: EnvsVars } = envSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const envs = {
    PORT: EnvsVars.PORT,
    DATABASE_URL: EnvsVars.DATABASE_URL,
    JWT_SECRET: EnvsVars.JWT_SECRET,

}
