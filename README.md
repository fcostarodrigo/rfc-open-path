# RFC-OPEN-PATH

Simple node module to create nested directories of a path like `mkdir -p`

## Installation

    npm install rfc-open-path

## Usage

    const openPath = require('rfc-open-path');

    openPath('a/b/c/d/e.f');

## Reference

    openPath(pathToOpen)

Create nested directories of a path.

* `pathToOpen`: String with the path. Can be the path of a file.

## Development

    npm test

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
