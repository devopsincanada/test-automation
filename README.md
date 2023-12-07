# Automated Test Cases

## Parameterized Tests

The documentation [Associate automated tests with test cases](https://learn.microsoft.com/azure/devops/test/associate-automated-test-with-test-case?view=azure-devops) states:

> The parameters in a test case are not used by any automated test that you associate with a test case. Iterations of a test case that use these parameters are for manual tests only.

This means that parameters defined in the test case are not available to the automated test. We can use the test case to define the test steps and expected results, but we cannot use the test case to define the test data. We must define the test data in the automated test.

Test data can be defined in the automated test in a number of ways. The test data can be defined in the test code, or the test data can be defined in a data source. The data source can be a CSV file, a JSON file, or a database. The test code can read the data from the data source and use the data in the test. The test code can also write the data to the data source.

## Associating Automated Tests with Test Cases

The documentation [Associate automated tests with test cases](https://learn.microsoft.com/azure/devops/test/associate-automated-test-with-test-case?view=azure-devops) provides manual steps for associating automated tests with test cases. If you have a large number of test cases, you may want to automate the process of associating the automated tests with the test cases. Note that these steps require you to use Visual Studio to associate the automated tests with the test cases.

If you aren't using Visual Studio, the StackOverflow article [Is there a way to associate Automated tests to Test Cases in Azure DevOps using VS Code?](https://stackoverflow.com/questions/63179342/is-there-a-way-to-associate-automated-tests-to-test-cases-in-azure-devops-using) provides an answer that uses an open source tool, [janono.ado.testcase.associate.cli](https://github.com/JanuszNowak/janono.ado.testcase.associate.cli), to associate automated tests with test cases.

## Run Automated Tests from Test Plans

[Run automated tests from test plans](https://learn.microsoft.com/azure/devops/test/run-automated-tests-from-test-hub?view=azure-devops)

* Create build definition
* Configure test plan settings
* 


## VSTest@2

From the [VSTest@2](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/vstest?view=azure-devops) documentation:

| Parameter | Description | Required | Default |
| --- | --- | --- | --- |
| `testSelector` | Specifies the tests to run. Options include `testAssembly` (default), `testPlan`, `testRun`. | No | `testAssembly` |
| `testAssemblyVer2` | The file paths to the test assemblies. | Yes (if `testSelector` is `testAssembly`) | - |
| `testPlan` | The ID of the test plan. | Yes (if `testSelector` is `testPlan`) | - |
| `testSuite` | The IDs of the test suites. | Yes (if `testSelector` is `testPlan`) | - |
| `testConfiguration` | The ID of the test configuration. | No | - |
| `overrideTestrunParameters` | Parameters to override in the test run. Format: `-key1 value1 -key2 value2`. | No | - |
| `codeCoverageEnabled` | Enable code coverage. | No | `false` |
| `runInParallel` | Run tests in parallel. | No | `false` |
| `runTestsInIsolation` | Run tests in isolation. | No | `false` |
| `vsTestVersion` | Version of Visual Studio Test to use. | No | `latest` |
| `pathtoCustomTestAdapters` | Path to custom test adapters. | No | - |
| `otherConsoleOptions` | Other console options to pass to VSTest console. | No | - |
| `distributionBatchType` | Batch tests for distribution among agents. Options include `basedOnTestCases`, `basedOnExecutionTime`, `basedOnAssembly`. | No | `basedOnTestCases` |
| `batchingBasedOnAgentsOption` | Batch tests based on number of agents and test size. Options include `autoBatchSize`, `userSpecifiedBatchSize`. | No | `autoBatchSize` |
| `customBatchSizeValue` | User specified batch size if `batchingBasedOnAgentsOption` is `userSpecifiedBatchSize`. | No | - |
| `dontDistribute` | Do not distribute tests, run all tests on a single agent. | No | `false` |
| `testRunTitle` | Provide a name for the test run. | No | - |
| `platform` | The platform for which the tests are to be run. | No | - |
| `configuration` | The configuration for which the tests are to be run. | No | - |
| `publishRunAttachments` | Publish run attachments. | No | `true` |



Override parameters defined in the TestRunParameters section of runsettings file or Properties section of testsettings file. For example: -key1 value1 -key2 value2. Note: Properties specified in testsettings file can be accessed via the TestContext using Visual Studio 2017 Update 4 or higher


## References

- [Associate automated tests with test cases](https://learn.microsoft.com/azure/devops/test/associate-automated-test-with-test-case?view=azure-devops)
- [Requirements traceability](https://learn.microsoft.com/azure/devops/pipelines/test/requirements-traceability?view=azure-devops)
- [Run automated tests from test plans](https://learn.microsoft.com/azure/devops/test/run-automated-tests-from-test-hub?view=azure-devops)
- [Is there a way to associate Automated tests to Test Cases in Azure DevOps using VS Code?](https://stackoverflow.com/questions/63179342/is-there-a-way-to-associate-automated-tests-to-test-cases-in-azure-devops-using)

