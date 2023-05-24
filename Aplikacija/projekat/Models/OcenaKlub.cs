using System.ComponentModel.DataAnnotations;

namespace Models;

public class OcenaKlub
{
    [Key]
    public int ID { get; set; }

    [Range(1,5)]
    public int Ocena { get; set; }

    public Klub? Klub { get; set; }
}