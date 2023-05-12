using System.ComponentModel.DataAnnotations;

namespace Models;

public class Dogadjaj
{
    [Key]
    public int ID { get; set; }
    
    [Required]
    [MaxLength(50)]
    public String? Naziv { get; set; }
    
    [Required]
    public DateTime? DatumIVreme { get; set; }

    public Klub? Klub { get; set; }

    public Organizator? Organizator { get; set; }

    public MuzickiIzvodjac? MuzickiIzvodjac { get; set; }

    public List<KomentarDogadjaj>? KomentariDogadjaj { get; set; }

    public List<Rezervacija>? Rezervacije { get; set; }

    public List<Karta>? Karte { get; set; }

}