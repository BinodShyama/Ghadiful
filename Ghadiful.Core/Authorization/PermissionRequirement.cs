using Microsoft.AspNetCore.Authorization;

namespace Ghadiful.Core.Authorization
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(Permission permission)
        {
            if (permission == null)
            {
                throw new ArgumentNullException(nameof(permission));
            }
            Permission = permission;
        }

        public Permission Permission { get; set; }
    }
}
