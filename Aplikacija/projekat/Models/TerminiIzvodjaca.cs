using System.ComponentModel.DataAnnotations;

namespace Models;

public class TerminiIzvodjaca
{
    [Key]
    public int ID { get; set; }

    [Required]
    public MuzickiIzvodjac? MuzickiIzvodjac { get; set; }

    public DateTime Termin { get; set; }

    public bool Rezervisan { get; set; }

}