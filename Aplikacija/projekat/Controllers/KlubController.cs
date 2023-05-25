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

    [Authorize(Roles = "Admin")]
    [Route("DodajKlub/{idOrganizatora}/{naziv}/{lokacija}/{brojStolova}")]
    [HttpPost]
   public async Task<ActionResult> DodajKlub(int idOrganizatora, String naziv, String lokacija, int brojStolova, [FromBody] string slikaKluba)
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
                Naziv=naziv,
                Lokacija = lokacija,
                BrojStolova = brojStolova,
                Ocene = null,
                Organizator = organizator,
                Dogadjaji = null,
				SlikaKluba = slikaKluba

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


    [Authorize]
    [Route("VratiKlubove")]
    [HttpGet]
    public async Task<ActionResult> VratiKlubove()
    {
        try
        {
            var d = await Context.Klubovi
            .Select(m => new
            {
                naziv = m.Naziv,
                lokacija = m.Lokacija,
                ocene = m.Ocene,
                brojStolova = m.BrojStolova,
                idOrganizatora = m.Organizator!.ID,
                usernameOrganizatora = m.Organizator.Username,
                dogadjaji = m.Dogadjaji

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