
// import qcw module
import {readYML, makeSchedule, makeAdaptiveNav, ignoreFiles, runQuartoRender} from "./qcw-functions.ts"

// set parameters
const configPath = '_config.yml';
const tempFilesDir = '';
const renderType = Deno.args[0];

// check for argument
if (renderType !== "partial" && renderType !== "full") {
    console.error("Error: The first argument must be 'partial' or 'full'.");
    Deno.exit(1);
}

// load _config.yml
const config = await readYML(configPath);

// pre-pre render steps
console.log("> Beginning ", renderType, " render.")
const schedule = await makeSchedule(config, tempFilesDir, renderType);
await makeAdaptiveNav(config, tempFilesDir, schedule);
if (renderType == "partial") {
  await ignoreFiles(schedule);
}

// run quarto render (which itself has pre- and post-render steps)
await runQuartoRender(renderType);