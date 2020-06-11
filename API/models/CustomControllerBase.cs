using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.models
{
    public class CustomControllerBase : ControllerBase
    {
        public ActionResult<ApiResult<T>> ReturnResponse<T>(Func<Task<T>> items)
        {
            var apiResult = new ApiResult<T>();
            try
            {
                apiResult.Data = items().Result;
                return Ok(apiResult);
            }
            catch (Exception e)
            {
                apiResult.error = e.StackTrace;
                return StatusCode(500, apiResult);
            }
        }
    }
}
