using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallCanterSystem.BLL.DTOs
{
    public class ResponseWrapper<T>
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public T ResponseData { get; set; }
    }
}
