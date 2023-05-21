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

    [Authorize(Roles = "a")]
    [Route("DodajKlub/{idOrganizatora}/{naziv}/{lokacija}/{kapacitet}")]
    [HttpPost]
    public async Task<ActionResult> DodajKlub(int idOrganizatora, String naziv, String lokacija, int kapacitet)
    {
        try
        {
            var organizator = await Context.Organizatori.FindAsync(idOrganizatora);

            var klub = new Klub
            {               
                Naziv=naziv,
                Lokacija = lokacija,
                Ocena = 0.0,
                Kapacitet = kapacitet,
                Organizator = organizator,
                Dogadjaji = null

            };
            Context.Klubovi.Add(klub);
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
                ocena = m.Ocena,
                kapacitet = m.Kapacitet,
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