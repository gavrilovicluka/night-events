using System.ComponentModel.DataAnnotations;

namespace Models;

public class MuzickiIzvodjac
{
    [Key]
    public int ID {get; set;}

    [Required]
    [MaxLength(50)]
    public String? Username { get; set; }

    [Required]
    [MaxLength(30)]
    public String? Password { get; set; }

    [Required]
    [RegularExpression(@"^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$")]
    public String? Email { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^[a-zA-Z]+$")]
    public String? Ime { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^[a-zA-Z]+$")]
    public String? Prezime { get; set; }

    [Required]
    [MaxLength(30)]
    public String? Zanr { get; set; }
    
    [Required]
    public int BrClanova { get; set; }

    [Required]
    [MaxLength(50)]
    public String? ImeIzvodjaca { get; set; }

    [Required]
    [Range(1,5)]
    public double Ocena { get; set; }

    public List<Dogadjaj>? Dogadjaji { get; set; }

    public List<KomentarIzvodjac>? KomentariIzvodjac { get; set; }
}