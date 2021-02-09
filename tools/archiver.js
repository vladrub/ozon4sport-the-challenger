const fs = require('fs').promises;
const defailtFs = require('fs');
const archiver = require('archiver');

const srcArchive = `./archives/srcArch.zip`;
const buildArchive = `./archives/buildArch.zip`;

const generateScrArch = function () {
    const output = defailtFs.createWriteStream(srcArchive);

    const archive = archiver('zip', {
        zlib: { level: 9 },
    });
    output.on('close', function () {
        console.log(
            `... Src archive done, ${Math.round(
                archive.pointer() / 1024
            )} KB ...`
        );
    });

    output.on('end', function () {
        console.log('Data has been drained');
    });

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.log('No file found: ', err);
        } else {
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    fs.readdir('./')
        .then((files) => {
            files.forEach((file) => {
                if (defailtFs.statSync(`./${file}`).isDirectory()) {
                    if (
                        file !== 'node_modules' &&
                        file !== 'archives' &&
                        file !== 'build' &&
                        file !== '.git' &&
                        file !== '.idea'
                    ) {
                        archive.directory(`./${file}/`, file);
                    }
                } else {
                    if (file !== 'srcArch.zip' && file !== 'buildArch.zip')
                        archive.append(
                            defailtFs.createReadStream(`./${file}`),
                            {
                                name: file,
                            }
                        );
                }
            });
        })
        .then(() => {
            archive.finalize();
        });
};

const generateBuildArch = function () {
    const output = defailtFs.createWriteStream(buildArchive);

    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    output.on('close', function () {
        console.log(
            `... Build archive done, ${Math.round(
                archive.pointer() / 1024
            )} KB ...`
        );
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
        console.log('Data has been drained');
    });

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
            console.log(1);
        } else {
            // throw error
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(`./build/`, false);
    archive.finalize();
};

const generateArchives = function () {
    // generate src archive
    fs.access(srcArchive, defailtFs.constants.F_OK)
        .then(() => {
            fs.unlink(srcArchive).then(() => {
                console.log(`Deleting old and creating new src archive...`);
                generateScrArch();
            });
        })
        .catch(() => {
            console.log(`Creating src archive...`);
            generateScrArch();
        });
    // generate build archive
    fs.access(buildArchive, defailtFs.constants.F_OK)
        .then(() => {
            fs.unlink(buildArchive).then(() => {
                console.log(`Deleting old and creating new build archive...`);
                generateBuildArch();
            });
        })
        .catch(() => {
            console.log(`Creating build archive...`);
            generateBuildArch();
        });
};

generateArchives();
