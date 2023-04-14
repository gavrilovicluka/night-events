using System.ComponentModel.DataAnnotations;

namespace Models;

public class Dogadjaj
{
    [Key]
    public int ID { get; set; }
    
    [Required]
    [MaxLength(50)]
    public String? Naziv { get; set; }
    
    [Required]
    public DateTime? DatumIVreme { get; set; }
    
    [Required]
    public Klub? Klub { get; set; }

    [Required]
    public Organizator? Organizator { get; set; }

    [Required]
    public MuzickiIzvodjac? MuzickiIzvodjac { get; set; }

    [Required]
    public List<KomentarDogadjaj>? KomentariDogadjaj { get; set; }

}