using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public interface ICRUD
    {
        public Task<T> GetById<T>(int id);
        public Task<int> DeleteById(int id);
        public Task<int> Update<T>(T item);
        public Task<List<T>> GetAll<T>();
    }

    public class DALCRUD : ICRUD
    {
        public readonly Requestor requestor = new Requestor("PorteFolio");
        public DALCRUD()
        {

        }

        public Task<int> DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll<T>()
        {
            return requestor.Select<T>("");
        }

        public Task<T> GetById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update<T>(T item)
        {
            throw new NotImplementedException();
        }
    }
}
