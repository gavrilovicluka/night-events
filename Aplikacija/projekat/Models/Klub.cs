using System.ComponentModel.DataAnnotations;

namespace Models;

public class Klub
{
    [Key]
    public int ID { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9]+$")]
    public String? Naziv { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[A-Za-z0-9]+[_-' ]+$")]
    public String? Lokacija { get; set; }
    
    [Required]
    [Range(1,5)]
    public double Ocena { get; set; }

    public int Kapacitet { get; set; }

    public Organizator? Organizator { get; set; }

    public List<Dogadjaj>? Dogadjaji { get; set; }
}