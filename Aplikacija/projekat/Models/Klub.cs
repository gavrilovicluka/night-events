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
    [MaxLength(50)]
    [RegularExpression(@"^[A-Za-z0-9]+[_-' ]+$")]
    public String? Lokacija { get; set; }

    [Required]
    public int BrojStolova { get; set; }

    public String? SlikaKluba { get; set; }
    
    public List<OcenaKlub>? Ocene { get; set; }

    public Organizator? Organizator { get; set; }

    [JsonIgnore]
    public List<Dogadjaj>? Dogadjaji { get; set; }
    
}