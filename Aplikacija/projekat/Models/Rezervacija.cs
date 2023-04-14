using System.ComponentModel.DataAnnotations;

namespace Models;

public class Rezervacija 
{
    [Key]
    public int ID { get; set; }

    [Required]
    public Korisnik? Korisnik { get; set; }

    [Required]
    public Dogadjaj? Dogadjaj { get; set; }

    [Required]
    public int BrStola { get; set; }

    

}
