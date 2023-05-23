using System.ComponentModel.DataAnnotations;

namespace Models;

public class Klub
{
    [Key]
    public int ID { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9]+$")]
    public String? Naziv { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[A-Za-z0-9]+[_-' ]+$")]
    public String? Lokacija { get; set; }
    
    public List<OcenaKlub>? Ocene { get; set; }

    public Organizator? Organizator { get; set; }

    public List<Dogadjaj>? Dogadjaji { get; set; }
    
    public List<Sto> Stolovi { get; set; }
    public int BrojStolova { get; set; }

    public Klub() 
    {
        Stolovi = new List<Sto>(BrojStolova);

        for(int i=0; i<BrojStolova; i++)
        {
            Sto s = new Sto();
            Stolovi.Add(s);
        }
    }
}