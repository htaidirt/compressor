var fs = require('fs') ,
    fstream = require('fstream') ,
    tar = require('tar') ,
    zlib = require('zlib') ;

module.exports = function(src, dest){

    /*
     * Check if the source is a file or a folder.
     */
    var stats = fs.statSync(src);

    if(stats.isDirectory()){

        /*
         * The source is a directory.
         * 1/ convert it to .tar
         * 2/ compress using Gzip
         */

    } else if(stats.isFile()) {

        /*
         * The source is a file.
         * 1/ Compress it using Gzip
         */
        var inp = fs.createReadStream(src) ,
            out = fs.createWriteStream(dest) ;

        inp.pipe(zlib.Gzip()).pipe(out);
        console.log('File compressed.');

    }

}
