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

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Korisnik")]
    [Route("RezervisiMesto{idDogadjaja}/{idKorisnika}/{idStola}")]
    [HttpPost]
    public async Task<ActionResult> RezervisiMesto(int idDogadjaja, int idKorisnika, int idStola)
    {
        try
        {
            var dogadjaj = await Context.Dogadjaji.Include(p => p.Klub).Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if (dogadjaj == null)
            {
                return BadRequest("Ne postoji dati dogadjaj");
            }
            int ukupanBrojStolova = dogadjaj.Klub!.BrojStolovaBS + dogadjaj.Klub!.BrojStolovaS + dogadjaj.Klub!.BrojStolovaVS;
            if (dogadjaj.BrojRezervacija == ukupanBrojStolova)
            {
                return BadRequest("Nema slobodnih mesta za dati dogadjaj");
            }

            var k = await Context.Korisnici.FindAsync(idKorisnika);
            if (k == null)
            {
                return BadRequest("Ne postoji korisnik");
            }

            var sto = await Context.Stolovi.FindAsync(idStola);
            if (sto == null)
            {
                return BadRequest("Ne postoji sto");
            }
            else if (sto.Status == StatusStola.Zauzet)
            {
                return BadRequest("Izabrani sto je zauzet");
            }

            var provera = await Context.Rezervacije
                            .Include(a => a.Korisnik)
                            .Include(p => p.Dogadjaj)
                            .Where(b => b.Dogadjaj!.ID == idDogadjaja && b.Korisnik!.ID == idKorisnika)
                            .FirstOrDefaultAsync();

            if (provera != null)
            {
                return BadRequest("Rezervacija je vec obavljena");
            }

            var rez = new Rezervacija
            {
                Sto = sto,
                Korisnik = k,
                Dogadjaj = dogadjaj,
                Datum = DateTime.Now
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

            return (Ok(rez));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Korisnik, Organizator")]
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
                datum = m.Datum
            })
            .ToListAsync();
            return Ok(r);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Organizator, Korisnik")]
    [Route("IzbrisiRezervaciju/{idRez}")]
    [HttpDelete]
    public async Task<ActionResult> IzbrisiRezervacija(int idRez)
    {
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

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Organizator")]
    [Route("VratiRezervacijeZaDogadjaj/{idDogadjaja}")]
    [HttpGet]
    public async Task<ActionResult> VratiRezervacije(int idDogadjaja)
    {
        try
        {
            var d = await Context.Rezervacije
            .Include(p => p.Korisnik)
            .Include(p => p.Sto)
            .Where(p => p.Dogadjaj!.ID == idDogadjaja)
            .Select(m => new
            {
                id = m.ID,
                sto = m.Sto,
                korisnik = m.Korisnik,
                datum = m.Datum
            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Organizator")]
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
                nazivDogadjaja = m.Dogadjaj.Naziv,
                datum = m.Datum
            })
            .ToListAsync();
            return Ok(d);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Korisnik")]
    [Route("RezervisiBarskiSto/{idDogadjaja}/{idKorisnika}")]
    [HttpPost]
    public async Task<ActionResult> RezervisiBarskiSto(int idDogadjaja, int idKorisnika)
    {
        try
        {
            var dogadjaj = await Context.Dogadjaji.Include(p => p.Klub).Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if (dogadjaj == null)
            {
                return BadRequest("Ne postoji dati dogadjaj");
            }
            int ukupanBrojStolova = dogadjaj.Klub!.BrojStolovaBS + dogadjaj.Klub!.BrojStolovaS + dogadjaj.Klub!.BrojStolovaVS;
            if (dogadjaj.BrojRezervacija == ukupanBrojStolova)
            {
                return BadRequest("Nema slobodnih mesta za dati dogadjaj");
            }

            var k = await Context.Korisnici.FindAsync(idKorisnika);
            if (k == null)
            {
                return BadRequest("Ne postoji korisnik");
            }

            var sto = await Context.StoloviBS
                            .Where(s => s.Dogadjaj!.ID == idDogadjaja && s.VrstaStola == "Barski sto" && s.Status == StatusStola.Slobodan)
                            .FirstOrDefaultAsync();
            if (sto == null)
            {
                return BadRequest("Ne postoji sto");
            }
            sto.Status = StatusStola.Zauzet;

            // var provera = await Context.Rezervacije
            //                 .Include(a=>a.Korisnik)
            //                 .Include(p => p.Dogadjaj)
            //                 .Where(b => b.Dogadjaj!.ID == idDogadjaja && b.Korisnik!.ID == idKorisnika)
            //                 .FirstOrDefaultAsync();

            // if(provera != null)
            // {
            //     return BadRequest("Rezervacija je vec obavljena");
            // }

            var rez = new Rezervacija
            {
                Sto = sto,
                Korisnik = k,
                Dogadjaj = dogadjaj,
                Datum = DateTime.Now
            };
            rez.Dogadjaj.BrojRezervacija++;

            Context.Rezervacije.Add(rez);
            Context.StoloviBS.Update(sto);
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

            return (Ok(rez));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Korisnik")]
    [Route("RezervisiSepare/{idDogadjaja}/{idKorisnika}")]
    [HttpPost]
    public async Task<ActionResult> RezervisiSepare(int idDogadjaja, int idKorisnika)
    {
        try
        {
            var dogadjaj = await Context.Dogadjaji.Include(p => p.Klub).Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if (dogadjaj == null)
            {
                return BadRequest("Ne postoji dati dogadjaj");
            }
            int ukupanBrojStolova = dogadjaj.Klub!.BrojStolovaBS + dogadjaj.Klub!.BrojStolovaS + dogadjaj.Klub!.BrojStolovaVS;
            if (dogadjaj.BrojRezervacija == ukupanBrojStolova)
            {
                return BadRequest("Nema slobodnih mesta za dati dogadjaj");
            }

            var k = await Context.Korisnici.FindAsync(idKorisnika);
            if (k == null)
            {
                return BadRequest("Ne postoji korisnik");
            }

            var sto = await Context.StoloviS
                            .Where(s => s.Dogadjaj!.ID == idDogadjaja && s.VrstaStola == "Separe" && s.Status == StatusStola.Slobodan)
                            .FirstOrDefaultAsync();
            if (sto == null)
            {
                return BadRequest("Ne postoji sto");
            }
            sto.Status = StatusStola.Zauzet;

            // var provera = await Context.Rezervacije
            //                 .Include(a=>a.Korisnik)
            //                 .Include(p => p.Dogadjaj)
            //                 .Where(b => b.Dogadjaj!.ID == idDogadjaja && b.Korisnik!.ID == idKorisnika)
            //                 .FirstOrDefaultAsync();

            // if(provera != null)
            // {
            //     return BadRequest("Rezervacija je vec obavljena");
            // }

            var rez = new Rezervacija
            {
                Sto = sto,
                Korisnik = k,
                Dogadjaj = dogadjaj,
                Datum = DateTime.Now
            };
            rez.Dogadjaj.BrojRezervacija++;

            Context.Rezervacije.Add(rez);
            Context.StoloviS.Update(sto);
            await Context.SaveChangesAsync();

            //Slanje mejla o uspesno izvrsenoj rezervaciji
            // using (SmtpClient smtpClient = new SmtpClient())
            // {
            //     // Potrebne informacije za slanje e-poste
            //     smtpClient.EnableSsl = true;
            //     smtpClient.UseDefaultCredentials = false;
            //     smtpClient.Credentials = new NetworkCredential("nightevents2023@gmail.com", "nightEvents2023!");
            //      smtpClient.Host = "smtp.gmail.com";
            //     smtpClient.Port = 587;
            //     smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

            //     string dogadjajString = dogadjaj.Naziv!; 
            //     string brojStolaString = rez.Sto.ID.ToString();
            //     string poruka = "Vasa rezervacija stola za dogadjaj " + dogadjajString + " je uspesno obavljena. ID stola: " + brojStolaString;


            //     using (MailMessage mailMessage = new MailMessage())
            //     {
            //         mailMessage.From = new MailAddress("nightevents2023@gmail.com");
            //         mailMessage.To.Add(k.Email!);
            //         mailMessage.Subject = "Uspesna rezervacija mesta";
            //         mailMessage.Body = poruka;


            //         await smtpClient.SendMailAsync(mailMessage);
            //     }
            // }

            return (Ok(rez));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Korisnik")]
    [Route("RezervisiVisokoSedenje/{idDogadjaja}/{idKorisnika}")]
    [HttpPost]
    public async Task<ActionResult> RezervisiVisokoSedenje(int idDogadjaja, int idKorisnika)
    {
        try
        {
            var dogadjaj = await Context.Dogadjaji.Include(p => p.Klub).Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if (dogadjaj == null)
            {
                return BadRequest("Ne postoji dati dogadjaj");
            }
            int ukupanBrojStolova = dogadjaj.Klub!.BrojStolovaBS + dogadjaj.Klub!.BrojStolovaS + dogadjaj.Klub!.BrojStolovaVS;
            if (dogadjaj.BrojRezervacija == ukupanBrojStolova)
            {
                return BadRequest("Nema slobodnih mesta za dati dogadjaj");
            }

            var k = await Context.Korisnici.FindAsync(idKorisnika);
            if (k == null)
            {
                return BadRequest("Ne postoji korisnik");
            }

            var sto = await Context.StoloviVS
                            .Where(s => s.Dogadjaj!.ID == idDogadjaja && s.VrstaStola == "Visoko sedenje" && s.Status == StatusStola.Slobodan)
                            .FirstOrDefaultAsync();
            if (sto == null)
            {
                return BadRequest("Ne postoji sto");
            }
            sto.Status = StatusStola.Zauzet;

            // var provera = await Context.Rezervacije
            //                 .Include(a=>a.Korisnik)
            //                 .Include(p => p.Dogadjaj)
            //                 .Where(b => b.Dogadjaj!.ID == idDogadjaja && b.Korisnik!.ID == idKorisnika)
            //                 .FirstOrDefaultAsync();

            // if(provera != null)
            // {
            //     return BadRequest("Rezervacija je vec obavljena");
            // }

            var rez = new Rezervacija
            {
                Sto = sto,
                Korisnik = k,
                Dogadjaj = dogadjaj,
                Datum = DateTime.Now
            };
            rez.Dogadjaj.BrojRezervacija++;

            Context.Rezervacije.Add(rez);
            Context.StoloviVS.Update(sto);
            await Context.SaveChangesAsync();

            //Slanje mejla o uspesno izvrsenoj rezervaciji
            // using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
            // {
            //     // Potrebne informacije za slanje e-poste
            //     smtpClient.EnableSsl = true;
            //     smtpClient.UseDefaultCredentials = false;
            //     smtpClient.Credentials = new NetworkCredential("nightevents2023@gmail.com", "nightEvents2023!");

            //     string dogadjajString = dogadjaj.Naziv!; 
            //     string brojStolaString = rez.Sto.ID.ToString();
            //     string poruka = "Vasa rezervacija stola za dogadjaj " + dogadjajString + " je uspesno obavljena. ID stola: " + brojStolaString;


            //     using (MailMessage mailMessage = new MailMessage())
            //     {
            //         mailMessage.From = new MailAddress("nightevents2023@gmail.com");
            //         mailMessage.To.Add(k.Email!);
            //         mailMessage.Subject = "Uspesna rezervacija mesta";
            //         mailMessage.Body = poruka;


            //         await smtpClient.SendMailAsync(mailMessage);
            //     }
            // }

            return (Ok(rez));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}