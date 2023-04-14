using System.ComponentModel.DataAnnotations;

namespace Models;

public class Organizator : Korisnik
{
    [Required]
    public Klub? Klub { get; set; }

    [Required]
    public List<Dogadjaj>? Dogadjaji { get; set; }
}