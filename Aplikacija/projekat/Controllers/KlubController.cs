using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class KlubController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    public KlubController(NightEventsContext context)
    {
        Context = context;
    }

    //[Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin")]
    [Route("DodajKlub/{idOrganizatora}/{naziv}/{lokacija}/{brojStolovaBS}/{brojStolovaVS}/{brojStolovaS}")]
    [HttpPost]
   public async Task<ActionResult> DodajKlub(int idOrganizatora, String naziv, String lokacija, int brojStolovaBS, int brojStolovaVS, int brojStolovaS, [FromBody] SlikeKlubaDTO slike)
    {
        try
        {
            var organizator = await Context.Organizatori.FindAsync(idOrganizatora);
            if(organizator == null)
            {
                return BadRequest("Ne postoji organizator");
            }

            var klub = new Klub
            {      
                Naziv = naziv,
                Lokacija = lokacija,
                BrojStolovaBS = brojStolovaBS,
                BrojStolovaVS = brojStolovaVS,
                BrojStolovaS = brojStolovaS,
                Ocene = null,
                Organizator = organizator,
                Dogadjaji = null,
				SlikaKluba = slike.SlikaKluba,
                MapaKluba = slike.MapaKluba

            };
            Context.Klubovi.Add(klub);
            organizator.Klub = klub;
            Context.Organizatori.Update(organizator);

            await Context.SaveChangesAsync();

            return Ok(klub);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    //[Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin")]
    [Route("VratiKlubove")]
    [HttpGet]
    public async Task<ActionResult> VratiKlubove()
    {
        try
        {
            var d = await Context.Klubovi
            .Select(m => new
            {
                id = m.ID,
                naziv = m.Naziv,
                lokacija = m.Lokacija,
                ocene = m.Ocene,
                BrojStolovaBS = m.BrojStolovaBS,
                BrojStolovaVS = m.BrojStolovaVS,
                BrojStolovaS = m.BrojStolovaS,
                idOrganizatora = m.Organizator!.ID,
                usernameOrganizatora = m.Organizator.Username,
                dogadjaji = m.Dogadjaji,
                slikaKluba = m.SlikaKluba,
                mapaKluba = m.MapaKluba
            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Organizator")]
    [Route("VratiKlub/{idKlub}")]
    [HttpGet]
    public async Task<ActionResult> VratiKlub(int idKlub)
    {
        try
        {
            if (idKlub <= 0)
            {
                return BadRequest("Nevalidan ID kluba!");
            }

           var k = await Context.Klubovi
                    .Include(p => p.Ocene!)
                    .Include(p => p.Organizator!)
                    .Where(p => p.ID == idKlub)
                    .FirstOrDefaultAsync();

            if(k == null)
            {
                return BadRequest("Ne postoji izabrani klub!");
            }

            return Ok(k);           
        }
        catch (Exception e)
        { 
            return BadRequest(e.Message);
        }     
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Organizator")]
    [Route("IzmeniKlub")]
    [HttpPut]
    public async Task<ActionResult> IzmeniKlub([FromBody] IzmeniKlubDTO klubDTO)
    {
        try
        {
            var klub = await Context.Klubovi.FindAsync(klubDTO.ID);

            if (klub == null)
            {
                return BadRequest("Ne postoji izabrani klub");
            }

            klub.Lokacija = klubDTO.Lokacija;
            klub.BrojStolovaBS = klubDTO.BrojStolovaBS;
            klub.BrojStolovaS = klubDTO.brojStolovaS;
            klub.BrojStolovaVS = klubDTO.BrojStolovaVS;

            await Context.SaveChangesAsync();
            return Ok("Podaci kluba su uspešno izmenjeni!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Korisnik")]
    [Route("OceniKlub/{idKluba}/{ocena}")]
    [HttpPost]
    public async Task<ActionResult> OceniKlub(int idKluba,int ocena)
    {
        try
        {
            if(ocena <= 0 || ocena > 5)
            {
                return BadRequest("Nevalidan unos ocene");
            }

            var klub = await Context.Klubovi
                    .Include(p => p.Ocene!)
                    .Where(p => p.ID == idKluba)
                    .FirstOrDefaultAsync();

            if(klub == null)
            {
                return BadRequest("Ne postoji klub");
            }

            var o = new OcenaKlub
            {
                Ocena = ocena
            };

            if(klub.Ocene == null)
            {
                klub.Ocene = new List<OcenaKlub>();             
            }
            klub.Ocene.Add(o);

            Context.OceneKlubova.Add(o);
            await Context.SaveChangesAsync();

            double prosecnaOcena = 0.0;
            if (klub.Ocene.Count > 0)
            {
                double sum = klub.Ocene.Sum(o => o.Ocena);
                prosecnaOcena =  sum / klub.Ocene.Count;
            }

            double zaokruzenaOcena = Math.Round(prosecnaOcena, 2);
            return Ok(zaokruzenaOcena);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}