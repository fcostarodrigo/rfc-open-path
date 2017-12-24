# RFC-OPEN-PATH

[![Build Status](https://travis-ci.org/fcostarodrigo/rfc-open-path.svg?branch=master)](https://travis-ci.org/fcostarodrigo/rfc-open-path)
[![Maintainability](https://api.codeclimate.com/v1/badges/3f6da794cbfc4bce2a6a/maintainability)](https://codeclimate.com/github/fcostarodrigo/rfc-open-path/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f6da794cbfc4bce2a6a/test_coverage)](https://codeclimate.com/github/fcostarodrigo/rfc-open-path/test_coverage)

Simple node module to create nested directories of a path like `mkdir -p`.

## Installation

```bash
npm install rfc-open-path
```

## Usage

```javascript
const openPath = require("rfc-open-path");
```

Callback usage

```javascript
openPath("a/b/c/d/e", true, error => {
  if (error) throw error;

  console.log("done");
});
```

Promise usage

```javascript
openPath("a/b/c/d/e", true)
  .then(() => console.log("done"))
  .catch(error => console.error(error));
```

## Documentation

```typescript
function openPath(
  pathToOpen: string,
  fileInPath?: boolean,
  callback?: (error?: Error) => void
): Promise<void>;
```

Create nested directories of a path. Can be used with a callback or promise.

* `pathToOpen`: String with the path.
* `fileInPath`: Indicates if the last item of the path is a file.
* `callback`: Called after the directories were created or after an error.
* `promise`: Resolves to nothing after the directories are created or rejects with an error.

## Development

Full tests with coverage

```bash
npm test
```

Unit tests and watch for changes

```bash
npm run unit-test
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
