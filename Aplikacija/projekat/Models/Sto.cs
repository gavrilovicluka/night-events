using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public class Sto 
{
    [Key]
    public int ID { get; set; }

    public StatusStola Status { get; set; }

    [Required]
    [JsonIgnore]
    public Dogadjaj? Dogadjaj { get; set; }

    public Rezervacija? Rezervacija { get; set; }

    public String? VrstaStola { get; set; }

    public Sto()
    {
        Status = StatusStola.Slobodan;
    }

}
