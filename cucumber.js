module.exports = {
  default: {
    require: [
      "src/step-definitions/*.js",
      "src/hooks/*.js"
    ],
    format: [
      "progress",
      "json:src/reports/cucumber-report.json"
    ],
    paths: ["src/features/*.feature"],
    timeout: 60000
  }
};
