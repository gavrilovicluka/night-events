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
    public async Task<ActionResult> RegistrujOrganizatora([FromBody] OrganizatorRegistrationDTO organizatorDto)
    {

        if (string.IsNullOrWhiteSpace(organizatorDto.Ime))
        {
            return BadRequest("Unesite ime!");
        }

        else if (organizatorDto.Ime.Length < 3)
        {
            return BadRequest("Ime je previse kratko!");
        }

        else if (organizatorDto.Ime.Length > 50)
        {
            return BadRequest("Ime je previse dugacko!");
        }

        else if (!Regex.Match(organizatorDto.Ime, "^[A-Z][a-zA-Z]*$").Success)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        // Provera za unos prezimena
        if (string.IsNullOrWhiteSpace(organizatorDto.Prezime))
        {
            return BadRequest("Unesite prezime!");
        }
        else if (organizatorDto.Prezime.Length < 3)
        {
            return BadRequest("Prezime je previse kratko!");
        }

        else if (organizatorDto.Prezime.Length > 50)
        {
            return BadRequest("Prezime je previse dugacko!");
        }

        else if (!Regex.Match(organizatorDto.Prezime, "^[A-Z][a-zA-Z]*$").Success)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }


        if (string.IsNullOrWhiteSpace(organizatorDto.Username))
        {
            return BadRequest("Unesite korisnicko ime!");
        }
        else if (organizatorDto.Username.Length > 50)
        {
            return BadRequest("Username je previse dugacak!");
        }
        else if (!Regex.Match(organizatorDto.Username, @"^[a-zA-Z0-9._@#$% ]+$").Success)
        {
            return BadRequest("Nevalidan unos za username!");
        }



        if (string.IsNullOrWhiteSpace(organizatorDto.Email))
        {
            return BadRequest("Unesi email!");
        }
        else if (!Regex.Match(organizatorDto.Email, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").Success)
        {
            return BadRequest("Nevalidan unos email!");
        }



        if (string.IsNullOrWhiteSpace(organizatorDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        else if (organizatorDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        else if (organizatorDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }

        try
        {
            var k = Context.Organizatori.Where(p => p.Username == organizatorDto.Username).FirstOrDefault();
            if (k != null)
                return BadRequest("Korisnicko ime je zauzeto!");
            k = Context.Organizatori.Where(p => p.Email == organizatorDto.Email).FirstOrDefault();
            if (k != null)
                return BadRequest("Vec postoji registracija sa unetom email adresom!");

            AuthController.CreatePasswordHash(organizatorDto.Password, out byte[] PasswordHash, out byte[] PasswordSalt);

            Organizator org = new Organizator
            {
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

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [Route("VratiOrganizatore")]
    [HttpGet]
    public async Task<ActionResult> VratiOrganizatore()
    {
        try
        {
            var organizatori = await Context.Organizatori.Include(o => o.Klub).ToListAsync();

            var d = organizatori.Select(m => new
            {
                id = m.ID,
                ime = m.Ime,
                prezime = m.Prezime,
                email = m.Email,
                username = m.Username,
                klubId = m.Klub != null ? m.Klub.ID : -1,
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