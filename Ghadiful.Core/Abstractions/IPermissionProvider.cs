using Ghadiful.Core.Authorization;

namespace Ghadiful.Core.Abstractions
{
    public interface IPermissionProvider
    {
        Task<IEnumerable<Permission>> GetPermissionsAsync();
    }
}
