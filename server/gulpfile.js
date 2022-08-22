const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const minimize = require('gulp-uglify');
const { existsSync } = require('fs');

const srcDir = './src';
const outDir = './dist';

const removeOutDir = (cb) => {
  if (!existsSync(`${outDir}`)) {
    cb();
  } else {
    return src(`${outDir}`).pipe(
      clean({
        read: false,
        force: true,
        allowEmpty: true
      })
    );
  }
};

const minimizeJS = () => {
  return src(`${srcDir}/JSONServer.js`)
    .pipe(
      minimize({
        mangle: true,
        toplevel: true
      })
    )
    .pipe(dest(outDir));
};

const renameMin = () => {
  return src(`${outDir}/JSONServer.js`)
    .pipe(rename('JSONServer.min.js'))
    .pipe(dest(outDir));
};

const copyDefaultCfg = () => {
  return src(`${srcDir}/*.*`).pipe(dest(outDir));
};

exports.removeOutDir = removeOutDir;
exports.minimizeJS = minimizeJS;
exports.renameMin = renameMin;
exports.copyDefaultCfg = copyDefaultCfg;
exports.default = series(removeOutDir, minimizeJS, renameMin, copyDefaultCfg);
