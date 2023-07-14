namespace Ghadiful.ViewModel.DataTable
{
    public class DTResponseModel
    {
        public int? draw { get; set; }
        public int? recordsTotal { get; set; }
        public int? recordsFiltered { get; set; }

        public bool status { get; set; } = true;
        public object? data { get; set; }
    }
}
