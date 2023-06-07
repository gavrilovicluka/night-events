using Microsoft.AspNetCore.Authorization;
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
        if (string.IsNullOrWhiteSpace(adminDto.Username) || adminDto.Username.Length > 50)
        {
            return BadRequest("Nevalidno korisnicko ime!");
        }

        if (string.IsNullOrWhiteSpace(adminDto.Ime) || adminDto.Ime.Length > 20)
        {
            return BadRequest("Nevalidan unos imena!");
        }

        if (string.IsNullOrWhiteSpace(adminDto.Prezime) || adminDto.Prezime.Length > 20)
        {
            return BadRequest("Nevalidan unos prezimena!");
        }

        if (string.IsNullOrWhiteSpace(adminDto.Email))
        {
            return BadRequest("Unesi email!");
        }
        else if (Regex.IsMatch(adminDto.Email, "^([w.-]+)@([w-]+)((.(w){2,3})+)$"))
        {
            return BadRequest("Nevalidan email!");
        }

        if (string.IsNullOrWhiteSpace(adminDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        if (adminDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        if (adminDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }

        try
        {
            var a = Context.Administratori.Where(p => p.Username == adminDto.Username).FirstOrDefault();
            if (a != null)
                return BadRequest("Korisnicko ime je zauzeto!");

            a = Context.Administratori.Where(p => p.Email == adminDto.Email).FirstOrDefault();
            if (a != null)
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

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [HttpPut("OdobriNalogOrganizatora/{idOrganizatora}")]
    public async Task<ActionResult> OdobriNalog(int idOrganizatora)
    {
        var organizator = await Context.Organizatori.FindAsync(idOrganizatora);

        if (organizator == null)
        {
            return BadRequest("Ne postoji organizator");
        }

        organizator.Status = StatusNaloga.Odobren;
        Context.SaveChanges();

        return Ok();
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [HttpPut("OdbijNalogOrganizatora/{idOrganizatora}")]
    public async Task<ActionResult> OdbijNalog(int idOrganizatora)
    {
        var organizator = await Context.Organizatori.FindAsync(idOrganizatora);

        if (organizator == null)
        {
            return BadRequest("Ne postoji organizator");
        }

        organizator.Status = StatusNaloga.Odbijen;
        Context.SaveChanges();

        return Ok();
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [HttpPut("OdobriNalogIzvodjaca/{idIzvodjaca}")]
    public async Task<ActionResult> OdobriNalogIzvodjaca(int idIzvodjaca)
    {
        var izvodjac = await Context.MuzickiIzvodjaci.FindAsync(idIzvodjaca);

        if (izvodjac == null)
        {
            return BadRequest("Ne postoji muzicki izvodjac");
        }

        izvodjac.Status = StatusNaloga.Odobren;
        Context.SaveChanges();

        return Ok();
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [HttpPut("OdbijNalogIzvodjaca/{idIzvodjaca}")]
    public async Task<ActionResult> OdbijNalogIzvodjaca(int idIzvodjaca)
    {
        var izvodjac = await Context.MuzickiIzvodjaci.FindAsync(idIzvodjaca);

        if (izvodjac == null)
        {
            return BadRequest("Ne postoji muzicki izvodjac");
        }

        izvodjac.Status = StatusNaloga.Odbijen;
        Context.SaveChanges();

        return Ok();
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [HttpDelete("ObrisiOrganizatora/{idOrganizatora}")]

    public async Task<ActionResult> ObrisiOrganizatora(int idOrganizatora)
    {

        try
        {

            var organizator = await Context.Organizatori.FindAsync(idOrganizatora);

            if (organizator != null)

            {
                Context.Organizatori.Remove(organizator);
                await Context.SaveChangesAsync();
                return Ok($"ID obrisanog organizatora je: {idOrganizatora}");


            }
            return BadRequest("Ne postoji takav organizator");


        }


        catch (Exception e)

        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    [HttpDelete("ObrisiIzvodjaca/{idIzvodjaca}")]

    public async Task<ActionResult> ObrisiIzvodjaca(int idIzvodjaca)
    {

        try
        {

            var izvodjac = await Context.MuzickiIzvodjaci.FindAsync(idIzvodjaca);

            if (izvodjac != null)

            {
                Context.MuzickiIzvodjaci.Remove(izvodjac);
                await Context.SaveChangesAsync();
                return Ok($"ID obrisanog izvodjaca je: {idIzvodjaca}");


            }
            return BadRequest("Ne postoji takav izvodjac");


        }


        catch (Exception e)

        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin")]
    [HttpDelete("ObrisiKlub/{idKluba}")]
    public async Task<ActionResult> ObrisiKlub(int idKluba)
    {

        try
        {

            var klub = await Context.Klubovi.FindAsync(idKluba);

            if (klub != null)

            {
                Context.Klubovi.Remove(klub);
                await Context.SaveChangesAsync();
                return Ok($"ID obrisanog kluba je: {idKluba}");


            }
            return BadRequest("Ne postoji takav klub");


        }


        catch (Exception e)

        {
            return BadRequest(e.Message);
        }
    }


}
