using System.ComponentModel.DataAnnotations;

namespace Models;

public class Klub
{
    [Key]
    public int ID { get; set; }

    [Required]
    [MaxLength(50)]
    public String? Naziv { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[A-Za-z0-9]+[_-' ]+$")]
    public String? Lokacija { get; set; }
    
    [Required]
    [Range(1,5)]
    public double Ocena { get; set; }

    public int Kapacitet { get; set; }

    public List<Organizator>? Organizatori { get; set; }

    public List<Dogadjaj>? Dogadjaji { get; set; }
}