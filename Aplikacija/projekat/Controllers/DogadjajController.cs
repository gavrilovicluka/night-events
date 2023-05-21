using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class DogadjajController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    public DogadjajController(NightEventsContext context)
    {
        Context = context;
    }

    [Authorize(Roles = "o")]
    [Route("DodajDogadjaj/{idOrganizatora}/{idIzvodjaca}/{idKluba}/{naziv}/{datumIVreme}")]
    [HttpPost]
    public async Task<ActionResult> DodajDogadjaj(int idOrganizatora, int idIzvodjaca, int idKluba, String naziv, DateTime datumIVreme)
    {
        try
        {
            var organizator = await Context.Organizatori.FindAsync(idOrganizatora);
            var klub = await Context.Klubovi.FindAsync(idKluba);
            var izvodjac = await Context.MuzickiIzvodjaci.FindAsync(idIzvodjaca);

            var dogadjaj = new Dogadjaj
            {               
                Naziv=naziv,
                DatumIVreme = datumIVreme,
                Klub = klub,
                Organizator = organizator,
                MuzickiIzvodjac = izvodjac,
                KomentariDogadjaj = null,
                Rezervacije = null,
                Karte = null
            };
            Context.Dogadjaji.Add(dogadjaj);
            await Context.SaveChangesAsync();

            return Ok(dogadjaj);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [Route("VratiDogadjajeOrganizatora/{idOrg}")]
    [HttpGet]
    public async Task<ActionResult> VratiDogadjajeOrganizatora(int idOrg)
    {
        try
        {
            var d = await Context.Dogadjaji
            .Where(p => p.Organizator!.ID == idOrg)
            .Select(m => new
            {
                id = m.ID,
                naziv = m.Naziv,
                usernameOrganizatora = m.Organizator!.Username,
                idOrganizatora = m.Organizator.ID,
            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [Route("VratiDogadjajeKluba/{idKluba}")]
    [HttpGet]
    public async Task<ActionResult> VratiDogadjajeKluba(int idKluba)
    {
        try
        {
            var d = await Context.Dogadjaji
            .Where(p => p.Klub!.ID == idKluba)
            .Select(m => new
            {
                id = m.ID,
                naziv = m.Naziv,
                nazivKluba = m.Klub!.Naziv,
                idKluba = m.Klub.ID,
            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Roles = "o, a")]
    [Route("IzbrisiDogadjaj/{id}")]
    [HttpDelete]
    public async Task<ActionResult> IzbrisiDogadjaj(int id){
        try
        {
            var d = await Context.Dogadjaji
                    .Include(p=>p.Rezervacije)
                    .Include(p=>p.KomentariDogadjaj)
                    .Include(p=>p.Karte)
                    .Where(p => p.ID == id)
                    .FirstOrDefaultAsync();

           
            if (d != null)
            {
                Context.Dogadjaji.Remove(d);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izbrisan dogadjaj");
            }
            else
            {
                return BadRequest("Izabrani dogadjaj ne postoji");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [Route("VratiDogadjaje")]
    [HttpGet]
    public async Task<ActionResult> VratiDogadjaje()
    {
        try
        {
            var d = await Context.Dogadjaji
            .Select(m => new
            {
                naziv = m.Naziv,
                datumIVreme = m.DatumIVreme,
                idKluba = m.Klub!.ID,
                nazivKluba = m.Klub.Naziv,
                idOrganizatora = m.Organizator!.ID,
                usernameOrganizatora = m.Organizator.Username

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