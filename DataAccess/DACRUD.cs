using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        public readonly Requestor requestor;
        public DALCRUD()
        {
            requestor = new Requestor("PorteFolio");
        }

        public async Task<int> DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll<T>()
        {
            return requestor.Select<T>("");
        }

        public async Task<T> GetById<T>(int id)
        {
            return requestor.Select<T>("").First();
        }

        public async Task<int> Update<T>(T item)
        {
            throw new NotImplementedException();
        }
        public async Task<List<T>> Execute<T>(string name, object param = null)
        {
            return requestor.ExecuteStoredProcedure<T>(name, param);
        }
    }
}
