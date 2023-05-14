using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Models;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class KorisnikController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    public KorisnikController(NightEventsContext context)
    {
        Context = context;
    }

    [Route("RegistrujKorisnika")]
    [HttpPost]
    public async Task<ActionResult> RegistrujKorisnika([FromBody] KorisnikRegistrationDTO korisnikDto){
        
        if(string.IsNullOrWhiteSpace(korisnikDto.Username) || korisnikDto.Username.Length > 50)
        {
            return BadRequest("Predugacko korisnicko ime!");
        }

        /*else if (Regex.IsMatch(korisnikDto.Username, "^[a-zA-Z0-9]+([._]?[a-zA-Z0-9])$"))
        {
            return BadRequest("Nevalidan unos!");
        }*/

        if(string.IsNullOrWhiteSpace(korisnikDto.Email))
        {
            return BadRequest("Unesi email!");
        }

        if(string.IsNullOrWhiteSpace(korisnikDto.Ime) || korisnikDto.Ime.Length > 50)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        if( string.IsNullOrWhiteSpace(korisnikDto.Prezime) || korisnikDto.Prezime.Length > 50)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }

        if(string.IsNullOrWhiteSpace(korisnikDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        if(korisnikDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        if(korisnikDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }

        try
        {
            var k = Context.Korisnici.Where(p => p.Username == korisnikDto.Username).FirstOrDefault();
            if(k != null)
                return BadRequest("Korisnicko ime je zauzeto!");
            k = Context.Korisnici.Where(p => p.Email == korisnikDto.Email).FirstOrDefault();
            if(k != null)
                return BadRequest("Vec postoji registracija sa unetom email adresom!");
    
            AuthController.CreatePasswordHash(korisnikDto.Password, out byte[] PasswordHash, out byte[] PasswordSalt);
                
            Korisnik kor = new Korisnik{
                Ime = korisnikDto.Ime,
                Prezime = korisnikDto.Prezime,
                Email = korisnikDto.Email,
                Username = korisnikDto.Username,
                PasswordHash = PasswordHash,
                PasswordSalt = PasswordSalt,
            };
            Context.Korisnici.Add(kor);
            await Context.SaveChangesAsync();
            return Ok(kor);

                
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }    
}