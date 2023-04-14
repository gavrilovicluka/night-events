using System.ComponentModel.DataAnnotations;

namespace Models;

public class Karta
{
    [Key]
    public int ID { get; set; }

    [Required]
    public int Cena { get; set; }

    [Required]
    public Dogadjaj? Dogadjaj { get; set; }

    [Required]
    public Korisnik? Korisnik { get; set; }
}