using Microsoft.AspNetCore.Authorization;

namespace Ghadiful.Core.Authorization
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        public PermissionHandler()
        {

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (context.HasSucceeded || !(context?.User?.Identity?.IsAuthenticated ?? false))
            {
                return Task.CompletedTask;
            }
            else if (context.User.Claims.Any(claim => string.Equals(claim.Type, Permission.ClaimType, StringComparison.OrdinalIgnoreCase) && string.Equals(claim.Value, requirement.Permission.Name, StringComparison.OrdinalIgnoreCase)))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
