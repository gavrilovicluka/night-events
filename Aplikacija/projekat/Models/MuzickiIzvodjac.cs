using System.ComponentModel.DataAnnotations;

namespace Models;

public class MuzickiIzvodjac : Korisnik
{
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

    [Required]
    public List<KomentarIzvodjac>? KomentariIzvodjac { get; set; }
}