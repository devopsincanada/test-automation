namespace Demo;

public class TestData
{
  public int Number1 { get; set; }
  public string? Operator { get; set; }
  public int Number2 { get; set; }
  public int Result { get; set; }

  public static IEnumerable<TestCaseData> TestCases
  {
    get
    {
      string inputLine;
      using (FileStream inputStream = new FileStream("TestData.csv", FileMode.Open, FileAccess.Read))
      {
        StreamReader streamReader = new StreamReader(inputStream);

        while ((inputLine = streamReader.ReadLine()) != null)
        {
            var data = inputLine.Split(',');
            yield return new TestCaseData(Convert.ToInt32(data[0]), data[1], Convert.ToInt32(data[2]), Convert.ToInt32(data[3]));
        }

        streamReader.Close();
        inputStream.Close();
      }
    }
  }
}
