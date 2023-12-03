# Automated Test Cases

The documentation [Associate automated tests with test cases](https://learn.microsoft.com/azure/devops/test/associate-automated-test-with-test-case?view=azure-devops) states:

> The parameters in a test case are not used by any automated test that you associate with a test case. Iterations of a test case that use these parameters are for manual tests only.

This means that parameters defined in the test case are not available to the automated test. This is a problem because the automated test needs to know the parameters in order to run the test. The solution is to use the test case description to pass the parameters to the automated test.


## References

- [Associate automated tests with test cases](https://learn.microsoft.com/azure/devops/test/associate-automated-test-with-test-case?view=azure-devops)
- [Requirements traceability](https://learn.microsoft.com/azure/devops/pipelines/test/requirements-traceability?view=azure-devops)
- [Run automated tests from test plans](https://learn.microsoft.com/azure/devops/test/run-automated-tests-from-test-hub?view=azure-devops)
- [Is there a way to associate Automated tests to Test Cases in Azure DevOps using VS Code?](https://stackoverflow.com/questions/63179342/is-there-a-way-to-associate-automated-tests-to-test-cases-in-azure-devops-using)

