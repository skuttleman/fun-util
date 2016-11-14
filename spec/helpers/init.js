const Reporter = require('jasmine-spec-reporter');
const jasmineEnv = jasmine.getEnv();

jasmineEnv.clearReporters();

jasmineEnv.addReporter(new Reporter({
  displayStacktrace: 'summary'
}));
