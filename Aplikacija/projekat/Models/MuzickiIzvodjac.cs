using System.ComponentModel.DataAnnotations;

namespace Models;

public class MuzickiIzvodjac
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
    [MaxLength(30)]
    public String? Zanr { get; set; }
    
    [Required]
    public int BrClanova { get; set; }

    [Required]
    [MaxLength(50)]
    public String? ImeIzvodjaca { get; set; } 
    public List<OcenaMuzickiIzvodjac>? Ocene { get; set; }

    public List<TerminiIzvodjaca>? Termini { get; set; }

    public char Fleg { get; set; }
    public StatusNaloga Status { get; set; }

    public List<Dogadjaj>? Dogadjaji { get; set; }

    public List<KomentarIzvodjac>? KomentariIzvodjac { get; set; }

    public MuzickiIzvodjac()
    {
        Fleg = 'm';
        Status = StatusNaloga.NaCekanju;
    }
}