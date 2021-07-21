import {MongoClient} from 'mongodb';
import {env} from '*/config/env';

// Oob7DsjJ06VJNdxA

export const connectDB = async () => {
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    try {
        // connect the client to server
        await client.connect();
        console.log('Connect successfully to server!');

        // list databases
        await listDatabases(client);
    } finally {
        // ngat ket noi toi db
        await client.close();
    }
};

const listDatabases = async (client) => {
    const databases = await client.db().admin().listDatabases();
    databases.databases.forEach(db => console.log(`${db.name}`))
};