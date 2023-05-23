using System.ComponentModel.DataAnnotations;

namespace Models;

public class OcenaMuzickiIzvodjac
{
    [Key]
    public int ID { get; set; }

    [Range(1,5)]
    public int Ocena { get; set; }

    public MuzickiIzvodjac MuzickiIzvodjac { get; set; }
}