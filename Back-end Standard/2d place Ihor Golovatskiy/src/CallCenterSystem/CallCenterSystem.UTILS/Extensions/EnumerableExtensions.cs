using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace CallCenterSystem.UTILS.Extensions
{
    public static class EnumerableExtensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> value)
        {
            return value == null
                   || !value.Any();
        }
    }
}