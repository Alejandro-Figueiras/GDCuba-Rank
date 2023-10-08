import {config} from 'dotenv'

config();

export const projectConfig = {
    port : process.env.PORT || 3000
}