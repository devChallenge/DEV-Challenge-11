using System.Collections.Generic;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCanterSystem.BLL.Managers.Interfaces
{
    public interface ICallManager
    {
        List<Call> RegisterCalls(List<string> callArea);
    }
}