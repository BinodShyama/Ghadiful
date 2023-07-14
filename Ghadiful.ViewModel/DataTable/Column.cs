namespace Ghadiful.ViewModel.DataTable
{
    public class Column
    {
        public string? data { get; set; }
        public string? name { get; set; }
        public bool searchable { get; set; }
        public bool orderable { get; set; }
        public List<Search>? search { get; set; }
        public List<Order>? order { get; set; }
    }
}
