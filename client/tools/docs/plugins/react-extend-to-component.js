var fs = require('fs');
var logPath = './tools/docs/log.txt';
var newRun = true;

var write = (string) => {
  let context = '';
  if (!newRun) {
    context = fs.readFileSync(logPath, 'utf8');
  }
  context += JSON.stringify(string) + '\n\r';
  fs.writeFileSync(logPath, context);
  newRun = false;
}

exports.onStart = function(ev) {
  // take option
  // ev.data.option;
};

exports.onHandleConfig = function(ev) {
  // modify config
  // ev.data.config.title = ...;
};

exports.onHandleCode = function(ev) {
  // modify code
  // ev.data.code = ...;
  // console.log(ev.data.code);
};

exports.onHandleCodeParser = function(ev) {
  // modify parser
  // ev.data.parser = function(code) {
  //   console.log(code);
  //   return code;
  // };
};

exports.onHandleAST = function(ev) {
  // modify AST
  // ev.data.ast = ...;
  // console.log(ev.data.ast);
  // write(ev.data.ast);
};

exports.onHandleTag = function(ev) {
  // If we got extend by react component,
  // lets remove it
  ev.data.tag.forEach((tag) => {
    if (tag.extends) {
      let reactCompIndex = tag.extends.indexOf('react~React.Component');
      if (reactCompIndex >= 0) {
        tag.extends.splice(reactCompIndex, 1);
      }
      if (!tag.extends.length) {
        tag.extends = null;
      }
    }
  })
  return ev;
};

exports.onHandleHTML = function(ev) {
  // modify HTML
  // ev.data.html = ...;
};

exports.onComplete = function(ev) {
  // complete
};
