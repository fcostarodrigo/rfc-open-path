# RFC-OPEN-PATH

[![Build Status](https://travis-ci.org/fcostarodrigo/rfc-open-path.svg?branch=master)](https://travis-ci.org/fcostarodrigo/rfc-open-path)

Node module that creates missing folders in the middle of a path, like `mkdir -p`.

DEPRECATED: See [@fcostarodrigo/open-path](https://www.npmjs.com/package/@fcostarodrigo/open-path)

## Description

Let's say you want to create the file `docs/UI/button.txt`, but the folders `UI` and `docs` don't exist.

If you just try to create the file, this happens:

```js
> fs.writeFileSync('docs/UI/button.txt', 'test')
Thrown:
{ Error: ENOENT: no such file or directory, open 'docs/UI/button.txt'
    at Object.openSync (fs.js:448:3)
    at Object.writeFileSync (fs.js:1210:35)
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: 'docs/UI/button.txt' }
```

If you try to create the folder you get this:

```js
> fs.mkdirSync('docs/UI')
Thrown:
{ Error: ENOENT: no such file or directory, mkdir 'docs/UI'
    at Object.mkdirSync (fs.js:773:3) errno: -2, syscall: 'mkdir', code: 'ENOENT', path: 'docs/UI' }

```

Using this library you can create the inner folders easily:

```js
const openPath = require("rfc-open-path");

openPath("docs/UI/button.txt", true).then(() => {
  fs.writeFileSync("docs/UI/button.txt", "test");
});
```

## Installation

```bash
npm install rfc-open-path
```

## Usage

```js
const openPath = require("rfc-open-path");
```

### Callbacks

```js
openPath("docs/UI/button.txt", true, error => {
  if (error) throw error;

  console.log("done");
});
```

### Promises

```js
openPath("docs/UI")
  .then(() => console.log("done"))
  .catch(error => console.error(error));
```

### Async await

```js
async function() {
  await openPath("docs/UI");
  fs.writeFileSync('docs/UI/button.txt', 'test');
}
```

### CLI

```bash
rfc-open-path --help
```

## Documentation

```ts
function openPath(
  pathToOpen: string,
  fileInPath?: boolean,
  callback?: (error?: Error) => void
): Promise<void>;
```

- `pathToOpen`: String with the path.
- `fileInPath`: Indicates if the last item of the path is a file.
- `callback`: Called after the directories were created or after an error.
- `promise`: Resolves to nothing after the directories are created or rejects with an error.

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
