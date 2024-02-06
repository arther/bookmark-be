import {JSONStorage, Umzug, UmzugOptions} from "umzug";
import Typesense from "typesense";

const createClient = () => new Typesense.Client({
    'nodes': [{
        'host': 'localhost',
        'port': 8108,
        'protocol': 'http'
    }],
    'apiKey': process.env.TYPESENSE_API_KEY || "",
    'connectionTimeoutSeconds': 2
});

const umzug = new Umzug({
    storage: new JSONStorage(),
    migrations: {glob: "src/migrations/*.ts"},
    logger: console,
    context: () => {
        console.log(`Creating db client with key ${process.env.TYPESENSE_API_KEY}`);
        return {
            client: createClient()
        }
    }

} as UmzugOptions);

umzug.up().then((migrationMetas) => {
    console.log(JSON.stringify(migrationMetas))
});

export type Migration = typeof umzug._types.migration;