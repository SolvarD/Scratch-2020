using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestInitialize]
        public void init()
        {
           
        }
        [TestMethod]
        public void TestMethod1()
        {
            Assert.AreEqual(1,1);
        }
    }
}
