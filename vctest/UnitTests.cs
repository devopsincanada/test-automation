namespace vctest;

public class UnitTests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void PassTest()
    {
        Assert.Pass();
    }

    [Test]
    public void FailTest()
    {
        Assert.Fail();
    }
}