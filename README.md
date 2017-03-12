# RFC-OPEN-PATH

Simple node module to create nested directories of a path like `mkdir -p`.

See [rfc-open-path-sync](https://github.com/fcostarodrigo/rfc-open-path-sync)
for the synchronous version.

## Installation

    npm install rfc-open-path

## Usage

    const openPath = require('rfc-open-path');

Callback usage

    openPath('a/b/c/d/e', true, error => {
      if (error) {
        throw error;
      }

      console.log('done');
    });

Promise usage

    openPath('a/b/c/d/e', true)
      .then(() => console.log('done'))
      .catch(error => console.error(error));

## Reference

`openPath(pathToOpen: String, fileInPath?: Boolean, callback?: callback) => Promise`

`callback(error: Error)`

Create nested directories of a path. Can be used with a callback or promise.

* `pathToOpen`: String with the path.
* `fileInPath`: Indicates if the last item of the path is a file.
* `callback`: Called after the directories are created or after an error.
* `promise`: Resolves to nothing after the directories are created or rejects with an error.

## Development

    npm test

## License

[MIT](LICENSE.md)
