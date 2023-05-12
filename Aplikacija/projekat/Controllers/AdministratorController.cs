using Microsoft.AspNetCore.Mvc;
using Models;

namespace projekat.Controllers;

[ApiController]
[Route("[controller]")]
public class AdministratorController : ControllerBase
{
    public NightEventsContext Context { get; set; }
    public AdministratorController(NightEventsContext context)
    {
        Context = context;
    }

    
    
}
