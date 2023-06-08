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
        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.ImeIzvodjaca))
        {
            return BadRequest("Unesite ime!");
        }

       else if(muzickiIzvodjacDto.ImeIzvodjaca.Length < 3)
        {
            return BadRequest("Ime je previse kratko!");
        }

       else if(muzickiIzvodjacDto.ImeIzvodjaca.Length > 50)
        {
            return BadRequest("Ime je previse dugacko!");
        }

       else if (!Regex.Match(muzickiIzvodjacDto.ImeIzvodjaca, "^[A-Z][a-zA-Z]*$").Success)
        {
            return BadRequest("Nevalidan unos imena!");
        }
          
        

        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Zanr))
        {
            return BadRequest("Unesite zanr!");
        }
        else if(muzickiIzvodjacDto.Zanr.Length > 30)
        {
            return BadRequest("Predugacak zanr!");
        }

         if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.BrClanova.ToString()))
        {
            return BadRequest("Unesite broj clanova!");
        }
        else if (muzickiIzvodjacDto.BrClanova <= 0)
        {
            return BadRequest("Nevalidan unos broja clanova!");
        }

         if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Username))
            {
                return BadRequest("Unesite korisnicko ime!");
            }
            else if (muzickiIzvodjacDto.Username.Length > 50)
            {
                return BadRequest("Username je previse dugacak!");
            }
            else if (!Regex.Match(muzickiIzvodjacDto.Username, @"^[a-zA-Z0-9._@#$% ]+$").Success)
            {
                return BadRequest("Nevalidan unos za username!");
            }

         if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Email))
        {
            return BadRequest("Unesi email!");
        }
        else if (!Regex.Match(muzickiIzvodjacDto.Email, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").Success)
        {
            return BadRequest("Nevalidan unos email!");
        }

        
 
        if(string.IsNullOrWhiteSpace(muzickiIzvodjacDto.Password))
        {
            return BadRequest("Unesi lozinku!");
        }

        else if(muzickiIzvodjacDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        else if (muzickiIzvodjacDto.Password.Length < 8)
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
                Termini = null
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
    [Route("PostaviSlobodanTermin/{idIzvodjaca}")]
    [HttpPost]
    public async Task<ActionResult> PostaviSlobodanTermin(int idIzvodjaca, [FromBody] TerminIzvodjacaDTO terminDto)
    {
        try
        {
            var izvodjac = await Context.MuzickiIzvodjaci.Where(p=>p.ID==idIzvodjaca).FirstOrDefaultAsync();

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
            //izvodjac.Termini.Add(noviTermin);

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
                email = m.Email,
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

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin, Organizator")]
    [Route("VratiSlobodneMuzickeIzvodjaceZaDatum")]
    [HttpGet]
    public async Task<ActionResult> VratiSlobodneMuzickeIzvodjaceZaDatum(DateTime datum)
    {
        try
        {
            var slobodniIzvodjaci = await Context.MuzickiIzvodjaci
            .Where(m => m.Termini != null && 
                        m.Termini.FirstOrDefault(t => t.Termin == datum && !t.Rezervisan) != null)
            .Select(m => new
            {
                id = m.ID,
                username = m.Username,
                imeIzvodjaca = m.ImeIzvodjaca,
                zanr = m.Zanr,
                brojClanova = m.BrClanova,
                email = m.Email,
                termini = m.Termini,
                dogadjaji = m.Dogadjaji,
                status = m.Status

            })
            .ToListAsync();
            return Ok(slobodniIzvodjaci);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
	

    //[Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar, Organizator")]
    [Route("VratiListuTermina/{idIzvodjaca}")]
    [HttpGet]
    public async Task<ActionResult> VratiListuTermina(int idIzvodjaca)
    {
        try
        {
           var termini = await Context.TerminiIzvodjaca
            .Where(p => p.MuzickiIzvodjac!.ID == idIzvodjaca)
            .Select(m => new
            {
                id = m.ID,
                termin = m.Termin,
                rezervisan = m.Rezervisan,
                dogadjaj = m.MuzickiIzvodjac!.Dogadjaji!
                        .Where(d => d.Datum == m.Termin)
                        .Select(d => new
                        {
                            id = d.ID,
                            naziv = d.Naziv,
                            klub = d.Klub,
                            organizator = d.Klub!.Organizator
                        })
                        .ToList()
                                      
            })
            .ToListAsync();
          
            return Ok(termini);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Muzicar")]
    [HttpDelete("ObrisiTermin/{idTermina}")]

    public async Task<ActionResult> ObrisiTermin(int idTermina) {

     try 
        { 

         var termin= await Context.TerminiIzvodjaca.FindAsync(idTermina);

         if(termin != null)
    
          {
            Context.TerminiIzvodjaca.Remove(termin);
            await Context.SaveChangesAsync();
            return Ok($"ID obrisanog termina je: {idTermina}");
            
    
          }
          return BadRequest("Ne postoji takav termin");
          

        }


        catch (Exception e)

        {
          return BadRequest(e.Message);
        }
    }


   
}
