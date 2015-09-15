'use strict';

module.exports = function (vorpal, options) {
  var app = options.app;

  vorpal.command('fetch <lib>', 'Automatically downloads and builds a given library.').option('-r, --rebuild', 'Rebuild index after complete. Defaults to true.').action(function (args, cb) {
    var self = this;
    var options = {};
    //self.delimiter(origDelimiter);
    options.rebuild = args.options.rebuild || true;
    app.autodocs.run(args.lib, options, function () {
      cb();
    });
  });

  vorpal.command('get fetchable', 'Lists libraries able to be be auto-built.').option('-m, --max <amt>', 'Maximum libraries items to show.').alias('get fetch').action(function (args, cb) {
    var self = this;
    var max = args.options.max || 30;
    var config = app.clerk.updater.config();
    var items = '\n  ' + Object.keys(config).join('\n  ') + '\n';
    this.log(items);
    cb();
  });
};