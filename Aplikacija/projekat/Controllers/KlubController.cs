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

    //[Authorize(Roles = "Admin")]
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


    // [Authorize]
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
        
}