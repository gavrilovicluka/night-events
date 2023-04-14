using System.ComponentModel.DataAnnotations;

namespace Models;

public class Korisnik
{
    [Key]
    public int ID {get; set;}

    [Required]
    [MaxLength(50)]
    public String? Username { get; set; }

    [Required]
    [MaxLength(30)]
    public String? Password { get; set; }

    [Required]
    [RegularExpression(@"^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$")]
    public String? Email { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^[a-zA-Z]+$")]
    public String? Ime { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^[a-zA-Z]+$")]
    public String? Prezime { get; set; }

    [Required]
    public List<KomentarDogadjaj>? KomentariDogadjaji { get; set; }

    [Required]
    public List<KomentarIzvodjac>? KomentariIzvodjaci { get; set; }

}