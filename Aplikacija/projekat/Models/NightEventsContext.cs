using Microsoft.EntityFrameworkCore;

namespace Models;

public class NightEventsContext : DbContext
{
    public DbSet<Administrator> Administratori { get; set; }

    public DbSet<Dogadjaj> Dogadjaji { get; set; }  

    public DbSet<Karta> Karte { get; set; }

    public DbSet<Klub> Klubovi { get; set; }

    public DbSet<KomentarDogadjaj> KomentariDogadjaji { get; set; }

    public DbSet<KomentarIzvodjac> KomentariIzvodjaci { get; set; }

    public DbSet<Korisnik> Korisnici { get; set; }  

    public DbSet<MuzickiIzvodjac> MuzickiIzvodjaci { get; set; }    

    public DbSet<Organizator> Organizatori { get; set; }

    public DbSet<Rezervacija> Rezervacije { get; set; }


    public NightEventsContext(DbContextOptions options) : base(options)
    {
        
    }
  
}