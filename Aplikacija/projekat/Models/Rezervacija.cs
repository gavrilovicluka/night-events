using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public class Rezervacija 
{
    [Key]
    public int ID { get; set; }

    [Required]
    public DateTime Datum { get; set; }

    [Required]
    [JsonIgnore]
    public Sto? Sto { get; set; }

    [Required]
    [JsonIgnore]
    public Korisnik? Korisnik { get; set; }

    [Required]
    [JsonIgnore]
    public Dogadjaj? Dogadjaj { get; set; }
}
