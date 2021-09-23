// http://stackoverflow.com/questions/14970224/anyone-know-of-a-good-way-to-convert-from-less-to-sass

function Less2Sass() {}

Less2Sass.prototype.convert = function (file) {
  this.file = file;

  this.convertInterpolatedVariables()
    .convertVariables()
    .convertTildaStrings()
    .convertMixins()
    .includeMixins()
    .convertExtend()
    .convertColorHelpers()
    .convertFileExtensions()
    .convertFunctionUnit()
    .convertFunctionFade();

  return this.file;
};

Less2Sass.prototype.includeMixins = function () {
  var includeRegex = /^(\s*)\.([a-zA-Z][\w\-]*\(?[^;{}]*\)?;{1}$)/gm;
  this.file = this.file.replace(includeRegex, "$1@include $2");

  return this;
};

Less2Sass.prototype.convertMixins = function () {
  // Simple form: no semicolons.
  const mixinRegexNoSemicolon =
    /^(\s*?)\.([\w\-]*?)\s*\(([\s\S][^\;]+?)?\)\s*\{$/gm;
  this.file = this.file.replace(mixinRegexNoSemicolon, "$1@mixin $2($3) {");
  // With semicolons.
  const mixinRegexWithSemicolon =
    /^(\s*?)\.([\w\-]*?)\s*\(([\s\S][^\,]+?)?\)\s*\{$/gm;
  this.file = this.file.replace(
    mixinRegexWithSemicolon,
    function (match, g1, g2, g3) {
      return g1 + "@mixin " + g2 + "(" + g3.replace(/;/g, ",") + ") {";
    }
  );

  return this;
};

Less2Sass.prototype.convertFunctionUnit = function () {
  // Two-args.
  const unitTwoArgRegex = /unit\((\S+),(\S+)\)/g;
  this.file = this.file.replace(unitTwoArgRegex, "0$2 + $1");
  // One-arg.
  const unitOneArgRegex = /unit\(([^,]+)\)/g;
  this.file = this.file.replace(unitOneArgRegex, "unit-less($1)");

  return this;
};

Less2Sass.prototype.convertFunctionFade = function () {
  // Two-args.
  const fadeRegex = /fade\((\S+),\s?(\S+)\)/g;
  this.file = this.file.replace(fadeRegex, function (match, p1, p2) {
    const percent = parseFloat(p2);
    if (isNaN(percent)) {
      throw new Error(`Expected a percentage as second arg of fade: ${match}`);
    }
    return `rgba(${p1}, ${percent / 100})`;
  });

  return this;
};

Less2Sass.prototype.convertExtend = function () {
  // http://lesscss.org/features/#extend-feature
  // &:extend syntax.
  const andExtendRegex = /&:extend\((.[\w]*)\);/g;
  this.file = this.file.replace(andExtendRegex, "@extend $1;");

  return this;
};

Less2Sass.prototype.convertColorHelpers = function () {
  var helperRegex = /spin\(/g;
  this.file = this.file.replace(helperRegex, "adjust-hue(");
  // TODO (EK): Flag other color helpers for manual conversion that SASS does not have

  return this;
};

Less2Sass.prototype.convertTildaStrings = function () {
  var tildaRegex = /~("|')/g;
  this.file = this.file.replace(tildaRegex, "$1");

  return this;
};

Less2Sass.prototype.convertInterpolatedVariables = function () {
  var interpolationRegex = /@\{(?!(\s|\())/g;
  this.file = this.file.replace(interpolationRegex, "#{$");

  return this;
};

Less2Sass.prototype.convertVariables = function () {
  // Matches any @ that doesn't have 'media ' or 'import ' after it.
  var atRegex = /@(?!(media|import|mixin|font-face|keyframes)(\s|\())/g;
  this.file = this.file.replace(atRegex, "$");

  return this;
};

Less2Sass.prototype.convertFileExtensions = function () {
  var extensionRegex = /\.less/g;
  this.file = this.file.replace(extensionRegex, ".scss");

  return this;
};

module.exports = new Less2Sass();
