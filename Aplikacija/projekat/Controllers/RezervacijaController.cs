using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class RezervacijaController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    public RezervacijaController(NightEventsContext context)
    {
        Context = context;
    }

    [Authorize(Roles = "k")]
    [Route("RezervisiMesto{idDogadjaja}/{idKorisnika}/{idStola}")]
    [HttpPost]
    public async Task<ActionResult> RezervisiMesto(int idDogadjaja, int idKorisnika, int idStola)
    {
        try
        {
            var dogadjaj = await Context.Dogadjaji.Include(p=>p.Klub).Where(p=>p.ID==idDogadjaja).FirstOrDefaultAsync();
            if(dogadjaj == null)
            {
                return BadRequest("Ne postoji dati dogadjaj");
            }           
            if(dogadjaj.BrojRezervacija == dogadjaj.Klub.BrojStolova)
            {
                return BadRequest("Nema slobodnih mesta za dati dogadjaj");
            }

            var k = await Context.Korisnici.FindAsync(idKorisnika);
            if(k == null) 
            {
                return BadRequest("Ne postoji korisnik");
            }

            var sto = await Context.Stolovi.FindAsync(idStola);
            if(sto == null) 
            {
                return BadRequest("Ne postoji sto");
            }
            else if(sto.Status == StatusStola.Zauzet)
            {
                return BadRequest("Izabrani sto je zauzet");
            }

            var provera = await Context.Rezervacije
                            .Include(a=>a.Korisnik)
                            .Include(p => p.Dogadjaj)
                            .Where(b => b.Dogadjaj!.ID == idDogadjaja && b.Korisnik!.ID == idKorisnika)
                            .FirstOrDefaultAsync();
            
            if(provera != null)
            {
                return BadRequest("Rezervacija je vec obavljena");
            }
            
            var rez = new Rezervacija
            {
                Sto = sto,
                Korisnik = k,
                Dogadjaj = dogadjaj,               
            };
            rez.Dogadjaj.BrojRezervacija++;

            Context.Rezervacije.Add(rez);
            await Context.SaveChangesAsync();

            //Slanje mejla o uspesno izvrsenoj rezervaciji
            // using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
            // {
            //     // Potrebne informacije za slanje e-pošte
            //     smtpClient.EnableSsl = true;
            //     smtpClient.Credentials = new NetworkCredential("nightevents@gmail.com", "nightevents");

            //     string dogadjajString = dogadjaj.Naziv!; 
            //     string brojStolaString = brojStola.ToString();
            //     string poruka = "Vasa rezervacija stola za dogadjaj " + dogadjajString + " je uspesno obavljena. Broj stola: " + brojStolaString;
                
                
            //     using (MailMessage mailMessage = new MailMessage())
            //     {
            //         mailMessage.From = new MailAddress("nightevents@gmail.com");
            //         mailMessage.To.Add(k.Email!);
            //         mailMessage.Subject = "Uspesna rezervacija mesta";
            //         mailMessage.Body = poruka;

                   
            //         await smtpClient.SendMailAsync(mailMessage);
            //     }
            // }
            
            return(Ok(rez));
        }
        catch (Exception e)
        { 
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [Route("VratiRezervaciju/{idRezervacije}")]
    [HttpGet]
    public async Task<ActionResult> VratiRezervaciju(int idRezervacije)
    {
        try
        {
            var r = await Context.Rezervacije
            .Where(p => p.ID == idRezervacije)
            .Select(m => new
            {
                sto = m.Sto,
                idKorisnika = m.Korisnik,
                usernameKorisnika = m.Korisnik!.Username,
                idDogadjaja = m.Dogadjaj!.ID,
            })
            .ToListAsync();
            return Ok(r);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Roles = "o, k")]
    [Route("IzbrisiRezervaciju/{idRez}")]
    [HttpDelete]
    public async Task<ActionResult> IzbrisiRezervacija(int idRez){
        try
        {
            var r = await Context.Rezervacije
                    .Where(p => p.ID == idRez)
                    .FirstOrDefaultAsync();
       
            if (r != null)
            {
                Context.Rezervacije.Remove(r);
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

    [Authorize(Roles = "o")]
    [Route("VratiRezervacijeZaDogadjaj/{idDogadjaja}")]
    [HttpGet]
    public async Task<ActionResult> VratiRezervacije(int idDogadjaja)
    {
        try
        {
            var d = await Context.Rezervacije
            .Where(p => p.Dogadjaj!.ID == idDogadjaja)
            .Select(m => new
            {
                idRezervacije = m.ID,
                sto = m.Sto,
                idKorisnika = m.Korisnik,
                usernameKorisnika = m.Korisnik!.Username
            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Roles = "o")]
    [Route("VratiRezervacijeKorisnika/{idKorisnika}")]
    [HttpGet]
    public async Task<ActionResult> VratiRezervacijeKorisnika(int idKorisnika)
    {
        try
        {
            var d = await Context.Rezervacije
            .Where(p => p.Korisnik!.ID == idKorisnika)
            .Select(m => new
            {
                idRezervacije = m.ID,
                sto = m.Sto,
                idDogadjaja = m.Dogadjaj!.ID,
                nazivDogadjaja = m.Dogadjaj.Naziv
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