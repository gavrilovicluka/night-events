using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    private readonly IConfiguration _configuration;
    public AuthController(NightEventsContext context, IConfiguration configuration)
    {
        Context = context;
        _configuration = configuration;
    }

    [Route("Provera")]
    [HttpGet]
    // [Authorize]
    public ActionResult Provera()
    {
        try
        {
            if(User?.Identity?.IsAuthenticated == true)
            {
                var userInfos = new List<object>();

                foreach (var identity in User.Identities)
                {
                    var userInfo = new
                    {
                        UserName = identity.Name,
                        Roles = identity.Claims
                            .Where(c => c.Type == ClaimTypes.Role)
                            .Select(c => c.Value)
                    };

                    userInfos.Add(userInfo);
                }

                return Ok(userInfos);
            }
            else
            {
                return BadRequest();
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }           
    }

    [Authorize]
    [Route("LogOut")]
    [HttpPost]
    public async Task<IActionResult> LogOut()
    {
        await HttpContext.SignOutAsync();
        return Ok(); //RedirectToPage("/index");
    }

    [Route("PrijaviSe")]
    [HttpPost]
    public async Task<ActionResult> PrijaviSe([FromBody] UserLoginDTO usrDto) 
    {
        if(string.IsNullOrWhiteSpace(usrDto.Username) || usrDto.Username.Length > 50)
        {
            return BadRequest("Predugacko korisnicko ime!");
        }

        if(usrDto.Username == "-" && usrDto.Password == "-")
        {
            return BadRequest("Unesite korisnicko ime i lozinku.");
        }

        if(usrDto.Username == "-")
        {
            return BadRequest("Unesite korisnicko ime.");
        }

        if(usrDto.Password == "-")
        {
            return BadRequest("Unesite lozinku.");
        }

        if(string.IsNullOrWhiteSpace(usrDto.Password))
        {
            return BadRequest("Unesite lozinku!");
        }

        if(usrDto.Password.Length > 40)
        {
            return BadRequest("Predugacka lozinka!");
        }

        if(usrDto.Password.Length < 8)
        {
            return BadRequest("Prekratka lozinka!");
        }

        try
        {
            // Provera da li je administrator
            var adm = await Context.Administratori.Where(p => p.Username == usrDto.Username).FirstOrDefaultAsync();
            
            if(adm != null && adm.PasswordHash != null && adm.PasswordSalt != null)
            {
                if(!VerifyPasswordHash(usrDto.Password, adm.PasswordHash, adm.PasswordSalt))
                    return BadRequest("Pogresna sifra");

                var token1 = CreateTokenAdmin(adm);
                    
                return Ok(new
                {
                    token = token1,
                    id = adm.ID,
                    username = adm.Username,
                    fleg = adm.Fleg
                });
            }

            // Provera da li je korisnik
            var kor = await Context.Korisnici.Where(p => p.Username == usrDto.Username).FirstOrDefaultAsync();
            
            if(kor != null && kor.PasswordHash != null && kor.PasswordSalt != null)
            {
                if(!VerifyPasswordHash(usrDto.Password, kor.PasswordHash, kor.PasswordSalt))
                    return BadRequest("Pogresna sifra");

                var token2 = CreateTokenKorisnik(kor);
                    
                return Ok(new
                {
                    token = token2,
                    id = kor.ID,
                    username = kor.Username,
                    fleg = kor.Fleg
                });
            }

            // Provera da li je organizator
            var org = await Context.Organizatori.Where(p => p.Username == usrDto.Username).FirstOrDefaultAsync();
            
            if(org != null && org.PasswordHash != null && org.PasswordSalt != null)
            {
                if(!VerifyPasswordHash(usrDto.Password, org.PasswordHash, org.PasswordSalt))
                    return BadRequest("Pogresna sifra");

                if(org.Status == StatusNaloga.NaCekanju)
                    return BadRequest("Nalog ceka na odobrenje administratora");
                else if(org.Status == StatusNaloga.Odbijen)
                    return BadRequest("Nalog je odbijen od strane administratora");

                var token3 = CreateTokenOrganizator(org);
                    
                return Ok(new
                {
                    token = token3,
                    id = org.ID,
                    username = org.Username,
                    fleg = org.Fleg
                });
            }

            // Provera da li je muzicki izvodjac
            var muz = await Context.MuzickiIzvodjaci.Where(p => p.Username == usrDto.Username).FirstOrDefaultAsync();
            
            if(muz != null && muz.PasswordHash != null && muz.PasswordSalt != null)
            {
                if(!VerifyPasswordHash(usrDto.Password, muz.PasswordHash, muz.PasswordSalt))
                    return BadRequest("Pogresna sifra");

                if(muz.Status == StatusNaloga.NaCekanju)
                    return BadRequest("Nalog ceka na odobrenje administratora");
                else if(muz.Status == StatusNaloga.Odbijen)
                    return BadRequest("Nalog je odbijen od strane administratora");

                var token4 = CreateTokenMuzIzvodjac(muz);
                    
                return Ok(new
                {
                    token = token4,
                    id = muz.ID,
                    username = muz.Username,
                    fleg = muz.Fleg
                });
            }
            else
            {
                return BadRequest("Korisnik sa unetim korisnickim imenom ne postoji!");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private async Task<ActionResult<string>> CreateTokenAdmin(Administrator adm)
    {
        if (adm == null || adm.Fleg == ' ' || adm.ID <= 0 || adm.Username == null)
        {
            return BadRequest("Nedostaju potrebni podaci za generisanje tokena.");
        }

        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Role , adm.Fleg.ToString()),
            new Claim(ClaimTypes.NameIdentifier, adm.ID.ToString()),
            new Claim(ClaimTypes.Name, adm.Username)

        };

        var tokenValue = _configuration.GetSection("AppSettings:Token").Value;
        if (string.IsNullOrEmpty(tokenValue))
        {
            return BadRequest("Konfiguracija za kljuc 'AppSettings:Token' nije pravilno postavljena.");
        }
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken
        (
            claims: claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: cred
        );

        var ci = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
        var cp = new ClaimsPrincipal(ci);
        await HttpContext.SignInAsync(cp);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }

    private async Task<ActionResult<string>> CreateTokenKorisnik(Korisnik kor)
    {
        if (kor == null || kor.Fleg == ' ' || kor.ID <= 0 || kor.Username == null)
        {
            return BadRequest("Nedostaju potrebni podaci za generisanje tokena.");
        }

        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Role , kor.Fleg.ToString()),
            new Claim(ClaimTypes.NameIdentifier, kor.ID.ToString()),
            new Claim(ClaimTypes.Name, kor.Username)
        };

        var tokenValue = _configuration.GetSection("AppSettings:Token").Value;
        if (string.IsNullOrEmpty(tokenValue))
        {
            return BadRequest("Konfiguracija za kljuc 'AppSettings:Token' nije pravilno postavljena.");
        }
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken
        (
            claims: claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: cred
        );

        var ci = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
        var cp = new ClaimsPrincipal(ci);
        await HttpContext.SignInAsync(cp);
        
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }

    private async Task<ActionResult<string>> CreateTokenOrganizator(Organizator org)
    {
        if (org == null || org.Fleg == ' ' || org.ID <= 0 || org.Username == null)
        {
            return BadRequest("Nedostaju potrebni podaci za generisanje tokena.");
        }

        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Role , org.Fleg.ToString()),
            new Claim(ClaimTypes.NameIdentifier, org.ID.ToString()),
            new Claim(ClaimTypes.Name, org.Username)
        };

        var tokenValue = _configuration.GetSection("AppSettings:Token").Value;
        if (string.IsNullOrEmpty(tokenValue))
        {
            return BadRequest("Konfiguracija za kljuc 'AppSettings:Token' nije pravilno postavljena.");
        }
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken
        (
            claims: claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: cred
        );

        var ci = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
        var cp = new ClaimsPrincipal(ci);
        await HttpContext.SignInAsync(cp);
        
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }

    private Task<ActionResult<string>> CreateTokenMuzIzvodjac(MuzickiIzvodjac muz)
    {
        if (muz == null || muz.Fleg == ' ' || muz.ID <= 0 || muz.Username == null)
        {
            return Task.FromResult<ActionResult<string>>(BadRequest("Nedostaju potrebni podaci za generisanje tokena."));
        }

        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Role , muz.Fleg.ToString()),
            new Claim(ClaimTypes.NameIdentifier, muz.ID.ToString()),
            new Claim(ClaimTypes.Name, muz.Username)
        };

        var tokenValue = _configuration.GetSection("AppSettings:Token").Value;
        if (string.IsNullOrEmpty(tokenValue))
        {
            return Task.FromResult<ActionResult<string>>(BadRequest("Konfiguracija za kljuc 'AppSettings:Token' nije pravilno postavljena."));
        }
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken
        (
            claims: claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: cred
        );

        // var ci = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
        // var cp = new ClaimsPrincipal(ci);
        // await HttpContext.SignInAsync(cp);
        
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);


        return Task.FromResult<ActionResult<string>>(jwt);

    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash,  byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }

    public static void CreatePasswordHash(string Password, out byte[] PasswordHash, out byte[] PasswordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            PasswordSalt = hmac.Key;
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
        }
    }
  
}