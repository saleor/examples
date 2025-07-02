#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */

// https://github.com/ArtiomTr/jest-coverage-report-action/issues/244#issuecomment-1260555231
const fs = require("fs");

const testReportFilename = process.cwd() + "/coverage/report.json";
const coverageReportFilename = process.cwd() + "/coverage/coverage-final.json";

const testReport = require(testReportFilename);
const coverageReport = require(coverageReportFilename);

testReport.coverageMap = coverageReport;

fs.writeFile(testReportFilename, JSON.stringify(testReport), (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Coverage report appended to " + testReportFilename);
});
