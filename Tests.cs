namespace Demo;

[janono.ado.testcase.associate.Organization("devopsincanada")]
public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    [janono.ado.testcase.associate.TestCase(2582)]
    public void TestSingle()
    {
        Assert.Multiple(() => { // COMMENT

            foreach (var item in TestData.TestCases)
            {
                int number1 = Int32.Parse(item.Arguments[0].ToString());
                string op = item.Arguments[1].ToString();
                int number2 = Int32.Parse(item.Arguments[2].ToString());
                int result = Int32.Parse(item.Arguments[3].ToString());

                switch (op)
                {
                    case "+":
                        Console.WriteLine($"Checking that: {number1} + {number2} = {result}");
                        Assert.That(number1 + number2, Is.EqualTo(result));
                        break;
                    case "-":
                        Console.WriteLine($"Checking that: {number1} - {number2} = {result}");
                        Assert.That(number1 - number2, Is.EqualTo(result));
                        break;
                    case "*":
                        Console.WriteLine($"Checking that: {number1} * {number2} = {result}");
                        Assert.That(number1 * number2, Is.EqualTo(result));
                        break;
                    case "/":
                        Console.WriteLine($"Checking that: {number1} / {number2} = {result}");
                        Assert.That(number1 / number2, Is.EqualTo(result));
                        break;
                }
            }

        }); // COMMENT

    }

    [Test]
    [NUnit.Framework.TestCase(33, "+", 33, 66)]
    [NUnit.Framework.TestCase(33, "-", 33, 0)]
    [NUnit.Framework.TestCase(33, "*", 33, 1089)]
    [NUnit.Framework.TestCase(33, "/", 33, 1)]
    [NUnit.Framework.Parallelizable(ParallelScope.All)]
    [janono.ado.testcase.associate.TestCase(2583)]
    public void TestWithParameters(int Number1, string Operator, int Number2, int Result)
    {
        switch (Operator)
        {
            case "+":
                Assert.That(Number1 + Number2, Is.EqualTo(Result));
                break;
            case "-":
                Assert.That(Number1 - Number2, Is.EqualTo(Result));
                break;
            case "*":
                Assert.That(Number1 * Number2, Is.EqualTo(Result));
                break;
            case "/":
                Assert.That(Number1 / Number2, Is.EqualTo(Result));
                break;
        }
    }

    [Test]
    [TestCaseSource(typeof(Demo.TestData), nameof(Demo.TestData.TestCases))]
    [janono.ado.testcase.associate.TestCase(2584)]
    public void TestWithExternalData(int Number1, string Operator, int Number2, int Result)
    {
        switch (Operator)
        {
            case "+":
                Assert.That(Number1 + Number2, Is.EqualTo(Result));
                break;
            case "-":
                Assert.That(Number1 - Number2, Is.EqualTo(Result));
                break;
            case "*":
                Assert.That(Number1 * Number2, Is.EqualTo(Result));
                break;
            case "/":
                Assert.That(Number1 / Number2, Is.EqualTo(Result));
                break;
        }
    }
}