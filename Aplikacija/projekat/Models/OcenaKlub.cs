using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public class OcenaKlub
{
    [Key]
    public int ID { get; set; }

    [Range(1,5)]
    public int Ocena { get; set; }

    [JsonIgnore]
    public Klub? Klub { get; set; }
}