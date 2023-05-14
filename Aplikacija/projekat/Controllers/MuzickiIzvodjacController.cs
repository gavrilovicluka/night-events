using Microsoft.AspNetCore.Mvc;
using Models;
using System.Text.RegularExpressions;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class MuzickiIzvodjacController : ControllerBase
{
    public NightEventsContext Context { get; set; }

    public MuzickiIzvodjacController(NightEventsContext context)
    {
        Context = context;
    }


    [Route("RegistrujMuzickogIzvodjaca")]
    [HttpPost]
    public async Task<ActionResult> RegistrujMuzickogIzvodjaca([FromBody] MuzickiIzvodjacRegistrationDto muzickiIzvodjacDto)
    {
        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Username) || muzickiIzvodjacDto.Username.Length > 50)
        {
            return BadRequest("Nevalidno korisnicko ime!");
        }

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Ime) || muzickiIzvodjacDto.Ime.Length > 20)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Prezime) || muzickiIzvodjacDto.Prezime.Length > 20)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Email))
        {
            return BadRequest("Unesi email!");
        }
        else if (Regex.IsMatch(muzickiIzvodjacDto.Email, "^([w.-]+)@([w-]+)((.(w){2,3})+)$"))
        {
            return BadRequest("Nevalidan email!");
        }

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Zanr) || muzickiIzvodjacDto.Zanr.Length > 30)
        {
            return BadRequest("Nevalidan unos zanra!");
        }

        if(muzickiIzvodjacDto.BrClanova <= 0)
        {
            return BadRequest("Nevalidan unos broja clanova!");
        }

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.ImeIzvodjaca) || muzickiIzvodjacDto.ImeIzvodjaca.Length > 50)
        {
            return BadRequest("Nevalidan unos imena izvodjaca!");
        }

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        if(muzickiIzvodjacDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        if(muzickiIzvodjacDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }
       
        try
        {
            var m = Context.MuzickiIzvodjaci.Where(p => p.Username == muzickiIzvodjacDto.Username).FirstOrDefault();
            if(m != null)
                return BadRequest("Korisnicko ime je zauzeto!");
                
            m = Context.MuzickiIzvodjaci.Where(p => p.Email == muzickiIzvodjacDto.Email).FirstOrDefault();
            if(m != null)
                return BadRequest("Vec postoji registracija sa unetom email adresom!");
            
            AuthController.CreatePasswordHash(muzickiIzvodjacDto.Password, out byte[] PasswordHash, out byte[] PasswordSalt);
            
            MuzickiIzvodjac muzIzv = new MuzickiIzvodjac
            {
                Username = muzickiIzvodjacDto.Username,
                Ime = muzickiIzvodjacDto.Ime,
                Prezime = muzickiIzvodjacDto.Prezime,
                Email = muzickiIzvodjacDto.Email,               
                PasswordHash = PasswordHash,
                PasswordSalt = PasswordSalt,   
                Zanr = muzickiIzvodjacDto.Zanr,
                BrClanova = muzickiIzvodjacDto.BrClanova,
                ImeIzvodjaca = muzickiIzvodjacDto.ImeIzvodjaca
            };

            Context.MuzickiIzvodjaci.Add(muzIzv);
            await Context.SaveChangesAsync();
            return Ok(muzIzv);
          
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
