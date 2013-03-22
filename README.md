# Compressor

A file/directory compressor smart module for node.js

Tags: compression, zip, tar

## How to use?

First install locally the module using _npm_:

    npm install compressor
    
You can also include _compressor_ in your `package.json` file under `dependencies` list.

Then, to use _compressor_, require it in your script:

    compressor = require('compressor');
    
To compress a file, or a directory, always use the following pattern:

    compressor(source[, compressed_file_name]);
    
No matter what the source type is, _compressor_ will detect automatically if it is a file or a directory, and apply the appropriate compression process.

The `compressed_file_name` is optional. If not species, _compressor_ will deduce the compressed file name based on the source name and type:

- if the source is a file with the path `path/to/file.ext`, the compressed file will be `file.ext.gz`
- if the source is a directory with the path `path/to/directory/`, the compressed directory will be called `directory.tar.gz`

Please, note that without specifying the destination path, the compressed file/directory will be placed the the same root as the script that called _compressor_. So, if you would like to place the compressed `.gz` file somewhere, specify it in the destination parameter, with the relative path to the script that called _compressor_.

Also not the that _compressor_ doesn't delete your source.

## Examples

See the `examples/` folder.

## License

MIT

## Author

Hassen Taidirt <htaidirt@gmail.com>

Much appreciate follow: [@htaidirt](http://twitter.com/htaidirt)


