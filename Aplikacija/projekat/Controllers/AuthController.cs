using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
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



    public static void CreatePasswordHash(string Password, out byte[] PasswordHash, out byte[] PasswordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            PasswordSalt = hmac.Key;
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
        }
    }



    
    
}