using System.Security.Claims;

namespace Ghadiful.Core.Authorization
{
    public class Permission
    {
        public const string ClaimType = "Permission";
        public string Name { get; }
        public string Description { get; set; }

        public PermissionGroup PermissionGroup { get; set; }

        public Permission(string name)
        {
            if (name == null)
            {
                throw new ArgumentNullException(nameof(name));
            }

            Name = name;
        }

        public Permission(string name, string description, PermissionGroup group) : this(name)
        {
            Description = description;
            PermissionGroup = group;
        }

        public static implicit operator Claim(Permission p)
        {
            return new Claim(ClaimType, p.Name);
        }

    }

    public class PermissionGroup : IEquatable<PermissionGroup>
    {
        public string Name { get; }
        public string Description { get; set; }
        public PermissionGroup(string name)
        {
            if (name == null)
            {
                throw new ArgumentNullException(nameof(name));
            }

            Name = name;
        }

        public PermissionGroup(string name, string description) : this(name)
        {
            Description = description;
        }

        public bool Equals(PermissionGroup? other)
        {
            if (Name != other?.Name) return false;
            if (Description != other?.Description) return false;
            return true;
        }

        //public int Compare(PermissionGroup? x, PermissionGroup? y)
        //{
        //    var res = x?.Name.CompareTo(y?.Name);
        //    if (res == 0) 
        //        x?.Description.CompareTo(y?.Description); 
        //    return res??1;
        //}
    }
}
