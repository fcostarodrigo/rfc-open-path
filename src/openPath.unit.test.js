const fs = require("fs");
const openPath = require("./openPath");

jest.mock("fs");

describe("openPath", () => {
  it("should create folders recursively", async () => {
    const file = "a/b/c/d/e.f";

    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c/d");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c/d/e.f");
      callback(null);
    });

    await openPath(file);
  });

  it("should use the last folder of a path", async () => {
    const folder = "a/b/c/d/e.f/";

    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c/d");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c/d/e.f");
      callback(null);
    });

    await openPath(folder);
  });

  it("should fail if there are files in place of folders", async () => {
    const file = "a/b/c/d/e.f";
    const error = { code: "ENOTDIR" };

    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a");
      callback({ code: "EEXIST" });
    });

    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b");
      callback(error);
    });

    await expect(openPath(file)).rejects.toBe(error);
  });

  it("should work with callbacks", done => {
    const folder = "a/b/c/d/e.f/";

    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c/d");
      callback(null);
    });
    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a/b/c/d/e.f");
      callback(null);
    });

    openPath(folder, false, done);
  });

  it("should pass errors to the callback", done => {
    const folder = "a/b/c/d/e.f/";
    const error = new Error("error");

    fs.mkdir.mockImplementationOnce((dir, callback) => {
      expect(dir).toBe("a");
      callback(error);
    });

    openPath(folder, true, err => {
      expect(err).toBe(error);
      done();
    });
  });
});
