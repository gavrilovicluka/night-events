using System.ComponentModel.DataAnnotations;

namespace Models;

public class KomentarDogadjaj
{
    [Key]
    public int ID { get; set; }

    [Required]
    public String? Sadrzaj { get; set; }

    public Korisnik? Korisnik { get; set; }

    public Dogadjaj? Dogadjaj { get; set; }
}