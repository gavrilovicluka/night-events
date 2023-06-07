using System.ComponentModel.DataAnnotations;

namespace Models;

public class Korisnik
{
    [Key]
    public int ID {get; set;}

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$")]
    public String? Username { get; set; }

    [Required]
    public byte[]? PasswordHash { get; set; }

    [Required]
    public byte[]? PasswordSalt { get; set; }

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

    public String Role { get; set; }

    public List<KomentarDogadjaj>? KomentariDogadjaji { get; set; }

    public List<KomentarIzvodjac>? KomentariIzvodjaci { get; set; }


    public List<Rezervacija>? Rezervacije { get; set; }

    public Korisnik()
    {
        Role = "Korisnik";
    }
}