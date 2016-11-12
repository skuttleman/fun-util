const Reporter = require('jasmine-reporter-console');

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter(new Reporter);
