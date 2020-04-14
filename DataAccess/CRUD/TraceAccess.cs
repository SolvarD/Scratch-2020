using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class TraceAccess : DALCRUD
    {
        public TraceAccess(Requestor requestor) : base(requestor, "Traces")
        { }
        public async Task<List<Trace>> GetAll()
        {
            return await base.GetAll<Trace>(new List<string> { "*" });
        }

        public async Task<Trace> Insert(Trace item)
        {
            List<string> columns = new List<string> { "Created", "Message"};
            return base.Insert<Trace>(item, columns);
        }
    }
}
