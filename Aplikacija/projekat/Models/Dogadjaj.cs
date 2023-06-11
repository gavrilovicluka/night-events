using System.ComponentModel.DataAnnotations;

namespace Models;

public class Dogadjaj
{
    [Key]
    public int ID { get; set; }
    
    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9]+$")]
    public String? Naziv { get; set; }
    
    [Required]
    public DateTime Datum { get; set; }

    [Required]
    public String? Vreme { get; set; }

    public Klub? Klub { get; set; }

    public MuzickiIzvodjac? MuzickiIzvodjac { get; set; }

    public List<Sto>? Stolovi { get; set; }    

    public List<Rezervacija>? Rezervacije { get; set; }

    public int BrojRezervacija { get; set; }


    public Dogadjaj()
    {
        BrojRezervacija = 0;
        
    }

}