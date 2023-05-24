using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
    [Route("DodajDogadjaj/{idKluba}/{idIzvodjaca}/{naziv}/{datumIVreme}")]
    [HttpPost]
    public async Task<ActionResult> DodajDogadjaj(int idKluba, int idIzvodjaca, String naziv, DateTime datumIVreme)
    {
        try
        {
            var klub = await Context.Klubovi.FindAsync(idKluba);
            if(klub == null)
            {
                return BadRequest("Klub ne postoji");
            }

            var izvodjac = await Context.MuzickiIzvodjaci.FindAsync(idIzvodjaca);
            if(izvodjac == null)
            {
                return BadRequest("Muzicki izvodjac ne postoji");
            }

            var dogadjaj = new Dogadjaj
            {               
                Naziv=naziv,
                DatumIVreme = datumIVreme,
                Klub = klub,
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
    [Route("VratiDogadjajeKluba/{idKluba}")]
    [HttpGet]
    public async Task<ActionResult> VratiDogadjajeKluba(int idKluba)
    {
        try
        {
            var klub = await Context.Klubovi.FindAsync(idKluba);
            if(klub == null)
            {
                return BadRequest("Klub ne postoji");
            }

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

            if(d == null)
            {
                return BadRequest("Ne postoje dogadjaji za dati klub");
            }

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
    public async Task<ActionResult> IzbrisiDogadjaj(int id)
    {
        try
        {
            int korisnikId;
            bool fleg = int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out korisnikId);

            if(!fleg)
            {
                return BadRequest("Doslo je do greske");
            }
            
            var d = await Context.Dogadjaji.FindAsync(id);

            if (d == null)
            {
                return BadRequest("Izabrani događaj ne postoji");
            }

            if (User.IsInRole("o") && d.Klub!.Organizator!.ID != korisnikId)
            {
                return Forbid(); // Korisnik nije autorizovan za brisanje događaja
            }
            

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
                nazivKluba = m.Klub.Naziv

            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Roles = "k,o")]
    [Route("KomentarisiDogadjaj/{idDogadjaja}/{idKorisnika}")]
    [HttpPut]
    public async Task<ActionResult> KomentarisiDogadjaj([FromBody] string sadrzaj, int idDogadjaja,int idKorisnika)
    {
        try
        {
            var dog = await Context.Dogadjaji
                    .Include(p => p.KomentariDogadjaj!)
                    .ThenInclude(p => p.Korisnik)
                    .Where(p => p.ID == idDogadjaja)
                    .FirstOrDefaultAsync();

            var kor = await Context.Korisnici.FindAsync(idKorisnika);

            if(dog == null)
            {
                return BadRequest("Ne postoji dogadjaj");
            }

            if(dog.KomentariDogadjaj != null)
            {
                dog.KomentariDogadjaj.ForEach(p => 
                {
                    if(p.Korisnik!.ID == idKorisnika)
                            throw new Exception("Korisnik je vec ostavio komentar za ovaj dogadjaj!");
                });
            }

           var pom = new KomentarDogadjaj
           {
                Sadrzaj = sadrzaj,
                Korisnik = kor,
                Dogadjaj = dog
            };

            Context.KomentariDogadjaji.Add(pom);

            await Context.SaveChangesAsync();
            return Ok(dog.KomentariDogadjaj);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
        
}