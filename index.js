/*
 * (C) Seth Lakowske
 */
var util = require('util');
var Writable = require('stream').Writable;

/*
 * WriteTest checks each write chunk against the expected write chunk
 * and throws error messages if they are not strictly equal.
 *
 * (C) Seth Lakowske
 */
function WriteTest(options) {
    if (!(this instanceof WriteTest)) {
        return new WriteTest(options);
    }

    this.test = options.test;
    this.testChunks = options.testChunks;
    this.pos = 0;
    Writable.call(this, options);
}
util.inherits(WriteTest, Writable);

WriteTest.prototype._write = function(chunk, enc, callback) {
    var testChunk = this.testChunks[this.pos];
    var chunkString = chunk.toString('utf8');
    var same = testChunk === chunkString;
    if (same) {
        console.log(this.pos + ' ' + chunkString + ' equaled ' + testChunk)
    } else {
        console.log(this.pos + ' ' + chunkString + ' did not equal ' + testChunk)
    }

    this.test.strictEqual(chunkString, testChunk, 'chunks should be equal');
    this.pos += 1;
    callback();
}

module.exports = WriteTest;
