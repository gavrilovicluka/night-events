using System.ComponentModel.DataAnnotations;

namespace Models;

public class Organizator
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
    
    public Klub? Klub { get; set; }

    public List<Dogadjaj>? Dogadjaji { get; set; }
}