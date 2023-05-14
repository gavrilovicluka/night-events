using Microsoft.AspNetCore.Mvc;
using Models;
using System.Text.RegularExpressions;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class AdministratorController : ControllerBase
{
    public NightEventsContext Context { get; set; }

    public AdministratorController(NightEventsContext context)
    {
        Context = context;
    }


    [Route("RegistrujAdministratora")]
    [HttpPost]
    public async Task<ActionResult> RegistrujAdministratora([FromBody] AdministratorRegistrationDto adminDto)
    {
        if(string.IsNullOrWhiteSpace(adminDto.Username) || adminDto.Username.Length > 50)
        {
            return BadRequest("Nevalidno korisnicko ime!");
        }

        if(string.IsNullOrWhiteSpace(adminDto.Ime) || adminDto.Ime.Length > 20)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        if(string.IsNullOrWhiteSpace(adminDto.Prezime) || adminDto.Prezime.Length > 20)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }

        if(string.IsNullOrWhiteSpace(adminDto.Email))
        {
            return BadRequest("Unesi email!");
        }
        else if (Regex.IsMatch(adminDto.Email, "^([w.-]+)@([w-]+)((.(w){2,3})+)$"))
        {
            return BadRequest("Nevalidan email!");
        }

        if(string.IsNullOrWhiteSpace(adminDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        if(adminDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        if(adminDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }
       
        try
        {
            var a = Context.Administratori.Where(p => p.Username == adminDto.Username).FirstOrDefault();
            if(a != null)
                return BadRequest("Korisnicko ime je zauzeto!");
                
            a = Context.Administratori.Where(p => p.Email == adminDto.Email).FirstOrDefault();
            if(a != null)
                return BadRequest("Vec postoji registracija sa unetom email adresom!");
            
            AuthController.CreatePasswordHash(adminDto.Password, out byte[] PasswordHash, out byte[] PasswordSalt);
            
            Administrator adm = new Administrator
            {
                Username = adminDto.Username,
                Ime = adminDto.Ime,
                Prezime = adminDto.Prezime,
                Email = adminDto.Email,               
                PasswordHash = PasswordHash,
                PasswordSalt = PasswordSalt,              
            };

            Context.Administratori.Add(adm);
            await Context.SaveChangesAsync();
            return Ok(adm);
          
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }
   
}
