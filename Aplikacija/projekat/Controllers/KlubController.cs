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
     private readonly IWebHostEnvironment _environment;
    public KlubController(NightEventsContext context, IWebHostEnvironment environment)
    {
        Context = context;
        this._environment = environment;
    }

    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin")]
    [Route("DodajKlub/{idOrganizatora}/{naziv}/{lokacija}/{brojStolovaBS}/{brojStolovaVS}/{brojStolovaS}")]
    [HttpPost]
   public async Task<ActionResult> DodajKlub(int idOrganizatora, String naziv, String lokacija, int brojStolovaBS, int brojStolovaVS, int brojStolovaS/*, [FromBody] SlikeKlubaDTO slike*/)
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
				// SlikaKluba = slike.SlikaKluba,
                // MapaKluba = slike.MapaKluba

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



    [Authorize(AuthenticationSchemes = "Bearer", Roles  = "Admin")]
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
                slikaKluba = GetImagebyKlubID(_environment, m.ID.ToString()),
                mapaKluba = GetMapbyKlubID(_environment, m.ID.ToString())
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
            klub.SlikaKluba = klub.SlikaKluba;
            if(klubDTO.SlikaKluba != null) 
            {
                klub.SlikaKluba = klubDTO.SlikaKluba;
            }
            klub.MapaKluba = klub.MapaKluba;
            if(klubDTO.MapaKluba != null) 
            {
                klub.MapaKluba = klubDTO.MapaKluba;
            }
            

            await Context.SaveChangesAsync();
            return Ok("Podaci kluba su uspešno izmenjeni!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //[Authorize(AuthenticationSchemes = "Bearer", Roles  = "Korisnik")]
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

    [Route("UploadImageSlikaKluba/{idKluba}")]
    [HttpPost]
    public async Task<ActionResult> UploadImageSlikaKluba(int idKluba)
    {
        try
        {         
            var _uploadedfiles = Request.Form.Files;
            foreach (IFormFile source in _uploadedfiles)
            {
                //string Filename = source.FileName;
                string Filepath = GetFilePathSlikaKluba(_environment, idKluba.ToString());

                if (!System.IO.Directory.Exists(Filepath))
                {
                    System.IO.Directory.CreateDirectory(Filepath);
                }

                string imagepath = Filepath + "\\slikaKluba.png";

                if (System.IO.File.Exists(imagepath))
                {
                    System.IO.File.Delete(imagepath);
                }
                using (FileStream stream = System.IO.File.Create(imagepath))
                {
                    await source.CopyToAsync(stream);
                }

                return Ok(imagepath);
            }
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
        return BadRequest("Nijedna slika nije otpremljena.");
    }

private static string GetImagebyKlubID(IWebHostEnvironment environment, string idKluba)
    {
        string ImageUrl = string.Empty;
        string HostUrl = "https://localhost:7037/";
        string Filepath = GetFilePathSlikaKluba(environment, idKluba);
        string Imagepath = Filepath + "\\slikaKluba.png";
        if (!System.IO.File.Exists(Imagepath))
        {
            ImageUrl = HostUrl + "/uploads/common/noimage.png";
        }
        else
        {
            ImageUrl = HostUrl + "/uploads/Klub/" + idKluba + "/slika/slikaKluba.png";
        }
        return ImageUrl;

    }
private static string GetMapbyKlubID(IWebHostEnvironment environment, string idKluba)
    {
        string ImageUrl = string.Empty;
        string HostUrl = "https://localhost:7037/";
        string Filepath = GetFilePathMapaKluba(environment, idKluba);
        string Imagepath = Filepath + "\\mapaKluba.png";
        if (!System.IO.File.Exists(Imagepath))
        {
            ImageUrl = HostUrl + "/uploads/common/noimage.png";
        }
        else
        {
            ImageUrl = HostUrl + "/uploads/Klub/" + idKluba + "/mapa/mapaKluba.png";
        }
        return ImageUrl;

    }

    private static string GetFilePathSlikaKluba(IWebHostEnvironment environment, string idKluba)
    {
        return environment.WebRootPath + "\\uploads\\Klub\\" + idKluba + "\\slika"; 
    }
    private static string GetFilePathMapaKluba(IWebHostEnvironment environment, string idKluba)
    {
        return environment.WebRootPath + "\\uploads\\Klub\\" + idKluba + "\\mapa"; 
    }


    [Route("GetPicture/{idKluba}")]
    [HttpGet]
    public IActionResult GetPicture(int idKluba)
    {
        return Ok(GetImagebyKlubID(_environment, idKluba.ToString()));
    }

    [Route("GetMap/{idKluba}")]
    [HttpGet]
    public IActionResult GetMap(int idKluba)
    {
        return Ok(GetMapbyKlubID(_environment, idKluba.ToString()));
    }

    [Route("UploadImageMapaKluba/{idKluba}")]
    [HttpPost]
    public async Task<ActionResult> UploadImageMapaKluba(int idKluba)
    {
        try
        {         
            var _uploadedfiles = Request.Form.Files;
            foreach (IFormFile source in _uploadedfiles)
            {
                //string Filename = source.FileName;
                string Filepath = GetFilePathMapaKluba(_environment, idKluba.ToString());

                if (!System.IO.Directory.Exists(Filepath))
                {
                    System.IO.Directory.CreateDirectory(Filepath);
                }

                string imagepath = Filepath + "\\mapaKluba.png";

                if (System.IO.File.Exists(imagepath))
                {
                    System.IO.File.Delete(imagepath);
                }
                using (FileStream stream = System.IO.File.Create(imagepath))
                {
                    await source.CopyToAsync(stream);
                }

                return Ok(imagepath);
            }
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
        return BadRequest("Nijedna slika nije otpremljena.");
    }

}