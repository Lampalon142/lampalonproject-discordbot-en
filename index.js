/////////////////////////////////////////////
            // Variables //

const { Client, Collection, Message } = require("discord.js");
const dotenv = require("dotenv"); dotenv.config();
const client = new Client({ intents: 32767 });
['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
client.commands = new Collection();
const mongoose = require('mongoose');
const Logger = require('./utils/Logger')

/////////////////////////////////////////////

mongoose.connect(process.env.DATABASE_URI, {
        autoIndex: false, 
        maxPoolSize: 10, 
        serverSelectionTimeoutMS: 5000, 
        socketTimeoutMS: 45000, 
        family: 4
}).then(() => { Logger.client('- connected to the database!')})
.catch(err => { Logger.error(err)});

/////////////////////////////////////////////
        //// Others ////

process.on('exit', code => { Logger.client(`The process terminated with code: ${code}!`)});

process.on('uncaughtException', (err, origin) => { 
        Logger.error(`UNCAUGHT_EXEPTION: ${err}`);
        console.error(`Origine: ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => { 
        Logger.warn(`UNHADLED_REJECTION: ${reason}\n`);
        console.log(promise)
});

process.on('warning', (...args) => Logger.warn(...args));

/////////////////////////////////////////////




/////////////////////////////////////////////
            //// Connexion bot ////

client.login(process.env.TOKEN);

/////////////////////////////////////////////