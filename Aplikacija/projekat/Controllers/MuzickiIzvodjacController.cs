using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                Email = muzickiIzvodjacDto.Email,               
                PasswordHash = PasswordHash,
                PasswordSalt = PasswordSalt,   
                Zanr = muzickiIzvodjacDto.Zanr,
                BrClanova = muzickiIzvodjacDto.BrClanova,
                ImeIzvodjaca = muzickiIzvodjacDto.ImeIzvodjaca,
                Dogadjaji = null,
                Termini = null,
                Ocene = null
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

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar")]
    [Route("PostaviSlobodanTermin")]
    [HttpPost]
    public async Task<ActionResult> PostaviSlobodanTermin([FromBody] TerminIzvodjacaDTO terminDto)
    {
        try
        {
            var izvodjac = await Context.MuzickiIzvodjaci.Where(p=>p.ID==terminDto.IdIzvodjaca).FirstOrDefaultAsync();

            if(izvodjac == null)
            {
                return BadRequest("Ne postoji dati muzicki izvodjac");
            }

            if(izvodjac.Termini == null)
            {
                izvodjac.Termini = new List<TerminiIzvodjaca>();
            }
            
            var noviTermin = new TerminiIzvodjaca 
            {
                MuzickiIzvodjac = izvodjac,
                Termin = terminDto.Datum
            };

            Context.TerminiIzvodjaca.Add(noviTermin);
            izvodjac.Termini.Add(noviTermin);

            await Context.SaveChangesAsync();
         
            return(Ok(izvodjac));
        }
        catch (Exception e)
        { 
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar")]
    [Route("IzmeniZanr/{idMuz}/{zanr}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniZanr(int idMuz, string zanr)
    {
        if(string.IsNullOrEmpty(zanr) || zanr.Length > 30)
        {
            return BadRequest("Nevalidan unos novog zanra!");
        }

        try
        {
            var k = await Context.MuzickiIzvodjaci.FindAsync(idMuz);

            if(k == null)
            {
                return BadRequest("Ne postoji izabrani muzicki izvodjac");
            }

            if(k.Zanr == zanr)
            {
                return BadRequest("Uneli ste isti zanr");
            }

            k.Zanr = zanr;
            await Context.SaveChangesAsync();
            return Ok("Zanr je uspesno izmenjen!");           
        }
        catch (Exception e)
        { 
            return BadRequest(e.Message);
        }     
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar")]
    [Route("IzmeniBrojClanova/{idMuz}/{brClanova}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniBrojClanova(int idMuz, int brClanova)
    {
        if(brClanova < 0)
        {
            return BadRequest("Nevalidan unos broja clanova!");
        }

        try
        {
            var k = await Context.MuzickiIzvodjaci.FindAsync(idMuz);

            if(k == null)
            {
                return BadRequest("Ne postoji izabrani muzicki izvodjac");
            }

            if(k.BrClanova == brClanova)
            {
                return BadRequest("Uneli ste isti broj clanova");
            }

            k.BrClanova = brClanova;
            await Context.SaveChangesAsync();
            return Ok("Broj clanova je uspesno izmenjen!");           
        }
        catch (Exception e)
        { 
            return BadRequest(e.Message);
        }     
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar")]
    [Route("IzmeniImeIzvodjaca/{idMuz}/{ime}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniImeIzvodjaca(int idMuz, string ime)
    {
        if(string.IsNullOrEmpty(ime) || ime.Length > 50)
        {
            return BadRequest("Nevalidan unos novog imena!");
        }

        try
        {
            var k = await Context.MuzickiIzvodjaci.FindAsync(idMuz);

            if(k == null)
            {
                return BadRequest("Ne postoji izabrani muzicki izvodjac");
            }

            if(k.ImeIzvodjaca == ime)
            {
                return BadRequest("Uneli ste isto ime izvodjaca");
            }

            k.ImeIzvodjaca = ime;
            await Context.SaveChangesAsync();
            return Ok("Ime izvodjaca je uspesno izmenjeno!");           
        }
        catch (Exception e)
        { 
            return BadRequest(e.Message);
        }     
    }
    
    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin, Organizator")]
    [Route("VratiMuzickeIzvodjace")]
    [HttpGet]
    public async Task<ActionResult> VratiMuzickeIzvodjace()
    {
        try
        {
            var d = await Context.MuzickiIzvodjaci
            .Select(m => new
            {
                id = m.ID,
                username = m.Username,
                imeIzvodjaca = m.ImeIzvodjaca,
                zanr = m.Zanr,
                brojClanova = m.BrClanova,
                ocene = m.Ocene,
                termini = m.Termini,
                dogadjaji = m.Dogadjaji,
                status = m.Status

            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
	

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar, Organizator")]
    [Route("VratiListuTermina/{idIzvodjaca}")]
    [HttpGet]
    public async Task<ActionResult> VratiListuTermina(int idIzvodjaca)
    {
        try
        {
            var d = await Context.TerminiIzvodjaca
			.Where(p => p.MuzickiIzvodjac!.ID == idIzvodjaca)
            .Select(m => new
            {
                datum = m.Termin

            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

   
}
