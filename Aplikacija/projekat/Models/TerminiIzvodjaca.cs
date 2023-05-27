using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public class TerminiIzvodjaca
{
    [Key]
    public int ID { get; set; }

    [Required]
    [JsonIgnore]
    public MuzickiIzvodjac? MuzickiIzvodjac { get; set; }

    public DateTime Termin { get; set; }

    public bool Rezervisan { get; set; }

}