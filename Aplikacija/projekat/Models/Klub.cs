using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
    [MaxLength(100)]
    [RegularExpression(@"^[A-Za-z0-9]+[_-' ]+$")]
    public String? Lokacija { get; set; }
    public double Longitude { get; set; }
    public double Latitude { get; set; }

    public String? SlikaKluba { get; set; }

    public String? MapaKluba { get; set; }

    [Required]
    public int BrojStolovaBS { get; set; }

    [Required]
    public int BrojStolovaVS { get; set; }

    [Required]
    public int BrojStolovaS { get; set; }
    
    public List<OcenaKlub>? Ocene { get; set; }

    public Organizator? Organizator { get; set; }

    [JsonIgnore]
    public List<Dogadjaj>? Dogadjaji { get; set; }
    
}