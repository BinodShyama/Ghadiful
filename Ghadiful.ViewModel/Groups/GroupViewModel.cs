namespace Ghadiful.ViewModel.Groups
{
    public class GroupViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
        public long? Hierarchy { get; set; }       
        public string? Tags { get; set; }
        /// <summary>
        /// To render the selected item in UI
        /// </summary>
        public bool IsSelected { get; set; } = false;
    }
}
