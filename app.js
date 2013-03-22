var fs = require('fs') ,
    path = require('path') ,
    zlib = require('zlib') ;

module.exports = function(src, dest){

    /*
     * Check if the source is a file or a folder,
     * and perform action depending on it.
     */
    var stats = fs.statSync(src);

    if(stats.isDirectory()){

        /*
         * The source is a directory.
         * Deduce destination file name if not defined.
         */
        if(typeof dest === 'undefined'){
            var urlParts = src.split(path.sep) ,
                destRootName = urlParts[urlParts.length - 1] ; // Get the last item in the array, as the final folder name.

            /*
             * Sometimes, if the source path finishes by '/', the destRootName is '',
             * in this case, take the second to last item in the array.
             */
            if(destRootName == '') destRootName = urlParts[urlParts.length - 2];

            dest = destRootName + '.tar.gz';
        }

        /*
         * The source is a directory.
         * 1/ convert it to .tar
         * 2/ compress using Gzip
         */
        var fstream = require('fstream') ,
            tar = require('tar') ;

        var inp = fstream.Reader({ 'path': src, 'type': 'Directory' }) ,
            out = fstream.Writer({ 'path': dest, 'type': 'File' }) ;

        inp.pipe(tar.Pack()).pipe(zlib.Gzip()).pipe(out);

        /*
         * log compression process.
         */
        out.on('close', function(){
            console.log('Folder compressed.');
        });

        out.on('error', function(){
            console.log('ERROR! Something goes wrong.');
        });

    } else if(stats.isFile()) {

        /*
         * The source is a file.
         * Deduce destination file name if not defined.
         */
        if(typeof dest === 'undefined'){
            dest = path.basename(src) + '.gz';
        }

        /*
         * The source is a file.
         * 1/ Compress it using Gzip
         */
        var inp = fs.createReadStream(src) ,
            out = fs.createWriteStream(dest) ;

        inp.pipe(zlib.Gzip()).pipe(out);

        /*
         * log compression process.
         */
        out.on('open', function(){
            console.log('Opening the destination file.');
        });

        out.on('close', function(){
            console.log('File compressed.');
        });

        out.on('error', function(){
            console.log('ERROR! Something goes wrong.');
        });

    }

}
