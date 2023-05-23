using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class OrganizatorController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    public OrganizatorController(NightEventsContext context)
    {
        Context = context;
    }

    [Route("RegistrujOrganizatora")]
    [HttpPost]
    public async Task<ActionResult> RegistrujOrganizatora([FromBody] OrganizatorRegistrationDTO organizatorDto){
        
        if(string.IsNullOrWhiteSpace(organizatorDto.Username) || organizatorDto.Username.Length > 50)
        {
            return BadRequest("Predugacko korisnicko ime!");
        }

        if(string.IsNullOrWhiteSpace(organizatorDto.Email))
        {
            return BadRequest("Unesi email!");
        }

        if(string.IsNullOrWhiteSpace(organizatorDto.Ime) || organizatorDto.Ime.Length > 50)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        if( string.IsNullOrWhiteSpace(organizatorDto.Prezime) || organizatorDto.Prezime.Length > 50)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }

        if(string.IsNullOrWhiteSpace(organizatorDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        if(organizatorDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        if(organizatorDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }

        try
        {
            var k = Context.Organizatori.Where(p => p.Username == organizatorDto.Username).FirstOrDefault();
            if(k != null)
                return BadRequest("Korisnicko ime je zauzeto!");
            k = Context.Organizatori.Where(p => p.Email == organizatorDto.Email).FirstOrDefault();
            if(k != null)
                return BadRequest("Vec postoji registracija sa unetom email adresom!");
    
            AuthController.CreatePasswordHash(organizatorDto.Password, out byte[] PasswordHash, out byte[] PasswordSalt);
                
            Organizator org = new Organizator{
                Ime = organizatorDto.Ime,
                Prezime = organizatorDto.Prezime,
                Email = organizatorDto.Email,
                Username = organizatorDto.Username,
                PasswordHash = PasswordHash,
                PasswordSalt = PasswordSalt,
            };
            Context.Organizatori.Add(org);
            await Context.SaveChangesAsync();
            return Ok(org); 

                
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [Authorize(Roles = "a")]
    [Route("VratiOrganizatore")]
    [HttpGet]
    public async Task<ActionResult> VratiOrganizatore()
    {
        try
        {
            var organizatori = await Context.Organizatori.ToListAsync();

            var d = organizatori.Select(m => new
            {
                ime = m.Ime,
                prezime = m.Prezime,
                email = m.Email,
                username = m.Username,
                klubId= m.Klub!.ID,
                status = m.Status
            });
            

            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
}