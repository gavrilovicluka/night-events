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
    public async Task<ActionResult> RegistrujKorisnika([FromBody] KorisnikRegistrationDTO korisnikDto)
    {

        // Provera unosa imena
        if(string.IsNullOrWhiteSpace(korisnikDto.Ime))
        {
            return BadRequest("Unesite ime!");
        }

       else if(korisnikDto.Ime.Length < 3)
        {
            return BadRequest("Ime je previse kratko!");
        }

       else if(korisnikDto.Ime.Length > 50)
        {
            return BadRequest("Ime je previse dugacko!");
        }

       else if (!Regex.Match(korisnikDto.Ime, "^[A-Z][a-zA-Z]*$").Success)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        // Provera za unos prezimena
        if( string.IsNullOrWhiteSpace(korisnikDto.Prezime))
        {
            return BadRequest("Unesite prezime!");
        }
        else if (korisnikDto.Prezime.Length < 3)
        {
            return BadRequest("Prezime je previse kratko!");
        }

        else if(korisnikDto.Prezime.Length > 50)
        {
            return BadRequest("Prezime je previse dugacko!");
        }

        else if (!Regex.Match(korisnikDto.Prezime, "^[A-Z][a-zA-Z]*$").Success)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }


        if(string.IsNullOrWhiteSpace(korisnikDto.Username))
        {
            return BadRequest("Unesite korisnicko ime!");
        }
        else if (korisnikDto.Username.Length > 50)
        {
            return BadRequest("Username je previse dugacak!");
        }
        else if (!Regex.Match(korisnikDto.Username, @"^[a-zA-Z0-9._@#$% ]+$").Success)
        {
            return BadRequest("Nevalidan unos za username!");
        }



        if(string.IsNullOrWhiteSpace(korisnikDto.Email))
        {
            return BadRequest("Unesi email!");
        }
        else if (!Regex.Match(korisnikDto.Email, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").Success)
        {
            return BadRequest("Nevalidan unos email!");
        }

        
 
        if(string.IsNullOrWhiteSpace(korisnikDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        else if(korisnikDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        else if (korisnikDto.Password.Length < 8)
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