import discoid from './index'

async function run() {
    const results = await discoid.list();
    console.log(results);
}

run();

discoid.list().then(console.log)
