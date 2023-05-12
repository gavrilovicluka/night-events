using System.ComponentModel.DataAnnotations;

namespace Models;

public class KomentarIzvodjac
{
    [Key]
    public int ID { get; set; }

    [Required]
    public String? Sadrzaj { get; set; }

    public Korisnik? Korisnik { get; set; }

    public MuzickiIzvodjac? MuzickiIzvodjac { get; set; }
}