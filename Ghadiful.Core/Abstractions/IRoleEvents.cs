namespace Ghadiful.Core.Abstractions
{
    public interface IRoleEvents
    {
        Task AssignPermissionsToRolesAsync();
    }
    public class RoleEvent : IRoleEvents
    {
        public virtual Task AssignPermissionsToRolesAsync()
        {
            return Task.CompletedTask;
        }
    }
}
