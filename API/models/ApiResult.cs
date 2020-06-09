using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.models
{
    public class ApiResult<T>
    {
        public T Data { get; set; }
        public bool isSuccess { get; set; } = true;
        public string error { get; set; }
    }
}
