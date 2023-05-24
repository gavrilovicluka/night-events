using System.ComponentModel.DataAnnotations;

namespace Models;

public class Sto 
{
    [Key]
    public int ID { get; set; }

    public StatusStola Status { get; set; }

    [Required]
    public Dogadjaj? Dogadjaj { get; set; }

    public Rezervacija? Rezervacija { get; set; }

    public Sto()
    {
        Status = StatusStola.Slobodan;
    }

}
