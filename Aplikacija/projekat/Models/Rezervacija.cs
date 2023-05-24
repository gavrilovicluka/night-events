using System.ComponentModel.DataAnnotations;

namespace Models;

public class Rezervacija 
{
    [Key]
    public int ID { get; set; }

    [Required]
    public DateTime Datum { get; set; }

    [Required]
    public Sto? Sto { get; set; }

    [Required]
    public Korisnik? Korisnik { get; set; }

    [Required]
    public Dogadjaj? Dogadjaj { get; set; }
}
